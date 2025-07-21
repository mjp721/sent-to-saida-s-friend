from datetime import timedelta, timezone
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from .serializers import  BlockProfileSerializer, ContactSerializer, HrPasswordResetSerializer, JobApplicationSerializer, JobPostingSerializer, KeyMomentSerializer, StudentSerializer,HRSerializer, TPOCampusDriveSerializer,TPOSerializer,PodcastSerializer
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import secrets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from rest_framework.permissions import AllowAny
from django.utils import timezone
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import StudentLoginSerializer ,HRLoginSerializer,TPOLoginSerializer
from .models import BlockProfileModel, HrPasswordResetModel, JobApplication, JobPosting, KeyMomentsModel,  StudentModel, HRModel, StudentPasswordResetModel, TPOCampusDrive, TPOModel,PodcastModel, TPOPasswordResetModel, contactModel
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.utils.html import strip_tags
import base64
from django.contrib.auth import update_session_auth_hash
from .serializers import ChangePasswordSerializer
import re
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from .models import CustomUser
from .serializers import UserSerializer
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def create_image(request):
    serializer = PodcastSerializer(data=request.data)
    if serializer.is_valid():
        image_file = request.data['image']
        file_name = default_storage.save(image_file.name, ContentFile(image_file.read()))
        serializer.validated_data['image'] = file_name
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_image(request, image_id):
    image = get_object_or_404(PodcastModel, pk=image_id)
    serializer = PodcastSerializer(image, data=request.data,partial=True)
    if serializer.is_valid():
        image_file = request.data.get('image', None)
        if image_file:
            file_name = default_storage.save(image_file.name, ContentFile(image_file.read()))
            serializer.validated_data['image'] = file_name
        
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_images(request):
    images = PodcastModel.objects.all()
    serializer = PodcastSerializer(images, many=True)

    data_with_urls = []
    for item in serializer.data:
        image_field = item.get('image')  
        if image_field:
            if isinstance(image_field, str):
                full_url = request.build_absolute_uri(image_field)
            else:
                full_url = request.build_absolute_uri(image_field.url)
            item['image_url'] = full_url
        else:
            item['image_url'] = None

        data_with_urls.append(item)

    return Response(data_with_urls)

@api_view(['GET'])
def get_image(request, image_id):
    image = get_object_or_404(PodcastModel, pk=image_id)
    serializer = PodcastSerializer(image)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_image(request, image_id):
    image = get_object_or_404(PodcastModel, pk=image_id)
    image.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# ----------------------------------------------------------------

@api_view(['POST'])
def create_student(request):
    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():

            profile_image_data = request.data.get('profile_image')
            if profile_image_data:
                try:
                    format, imgstr = profile_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_profile_image.{ext}")
                    serializer.validated_data['profile_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid profile image format'}, status=status.HTTP_400_BAD_REQUEST)


            student_id_image_data = request.data.get('student_id_image')
            if student_id_image_data:
                try:
                    format, imgstr = student_id_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_student_id_image.{ext}")
                    serializer.validated_data['student_id_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid student ID image format'}, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.save()

            user.verification_token = secrets.token_urlsafe(16)
            user.save()

            subject = 'Account Verification'
            message = render_to_string('verification_email_template.html', {
                'user': user,
                'verification_token': user.verification_token,
                'verification_link': request.build_absolute_uri(reverse('student_verify_user', kwargs={'token': user.verification_token})),
            })

            email_message = EmailMessage(subject, strip_tags(message), 'your_email@gmail.com', [user.personalMail])
            email_message.content_subtype = 'html'
            email_message.send()

            return Response({'message': 'User registered successfully. Check your email for verification.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def student_login(request):
    if request.method == 'POST':
        serializer = StudentLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                user = StudentModel.objects.get(username=username)
            except StudentModel.DoesNotExist:
                user = None

            if user is not None and check_password(password, user.password):
                if user.is_verified:
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)

                    # Store the access token in the database
                    user.access_token = access_token
                    user.save()

                    return Response({'id': user.id,'access_token': access_token}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'User not verified'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def student_verify_user(request, token):
    user = get_object_or_404(StudentModel, verification_token=token)
    
    if not user.is_verified and user.token_expires_at and user.token_expires_at > timezone.now():

        user.is_verified = True
        user.save()
        return redirect('student_verification_success')  
    elif user.is_verified:
        return Response({'message': 'Account already verified.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Verification link has expired.'}, status=status.HTTP_400_BAD_REQUEST)

def student_verification_success(request):
    return render(request, 'verification_success.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def student_forgot_password(request):
    if request.method == 'POST':
        email = request.data.get('email')

        user = get_object_or_404(StudentModel, personalMail=email)

        reset_token = secrets.token_urlsafe(16)
        expires_at = timezone.now() + timezone.timedelta(hours=1)
        StudentPasswordResetModel.objects.create(user=user, token=reset_token, expires_at=expires_at)

        subject = 'Password Reset'
        message = render_to_string('password_reset_email_template.html', {
            'user': user,
            'reset_token': reset_token,
            'reset_link': request.build_absolute_uri(reverse('reset_password', kwargs={'token': reset_token})),
        })

        email_message = EmailMessage(subject, strip_tags(message), 'your_email@gmail.com', [user.personalMail])
        email_message.content_subtype = 'html'
        email_message.send()

        return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def student_reset_password(request, token):
    if request.method == 'POST':
        password = request.data.get('password')
        reset_instance = get_object_or_404(StudentPasswordResetModel, token=token, expires_at__gt=timezone.now())

        user = reset_instance.user
        user.password = make_password(password)
        user.save()

        reset_instance.delete()

        return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_student(request, pk):
    obj = get_object_or_404(StudentModel, pk=pk)
    serializer = StudentSerializer(obj, data=request.data, context={'request': request},partial=True)
    if serializer.is_valid():

        profile_image_data = request.data.get('profile_image')
        if profile_image_data:
            format, imgstr = profile_image_data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_profile_image.{ext}")
            serializer.validated_data['profile_image'] = data

        student_id_image_data = request.data.get('student_id_image')
        if student_id_image_data:
            try:
                format, imgstr = student_id_image_data.split(';base64,')
                ext = format.split('/')[-1]
                data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_student_id_image.{ext}")
                serializer.validated_data['student_id_image'] = data
            except Exception as e:
                return Response({'message': 'Invalid student ID image format'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_students(request):
    objects = StudentModel.objects.all()
    serializer = StudentSerializer(objects, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_student(request, pk):
    obj = get_object_or_404(StudentModel, pk=pk)
    serializer = StudentSerializer(obj, context={'request': request})
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_student(request, pk):
    obj = get_object_or_404(StudentModel, pk=pk)
    obj.delete()
    return Response(status=204)


# ---------------------------------------------------------

@api_view(['POST'])
def create_hr(request):
    if request.method == 'POST':
        serializer = HRSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['officialEmail']
            
            # Extracting domain from the email address
            domain = re.split('@', email)[1].lower()

            # List of restricted email domains
            restricted_domains = ['gmail.com', 'yahoo.com']

            # Check if the email domain is restricted
            if domain in restricted_domains:
                return Response({'error': 'Registration with this email domain is not allowed.'}, status=status.HTTP_400_BAD_REQUEST)

            profile_image_data = request.data.get('profile_image')
            if profile_image_data:
                try:
                    # Decode base64 image data and save it as a profile image
                    format, imgstr = profile_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_profile_image.{ext}")
                    serializer.validated_data['profile_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid profile image format'}, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.save()
            user.verification_token = secrets.token_urlsafe(16)
            user.save()

            subject = 'Account Verification'
            message = render_to_string('verification_email_template.html', {
                'user': user,
                'verification_token': user.verification_token,
                'verification_link': request.build_absolute_uri(reverse('hr_verify_user', kwargs={'token': user.verification_token})),
            })

            email_message = EmailMessage(subject, strip_tags(message), 'your_email@gmail.com', [user.officialEmail])
            email_message.content_subtype = 'html'
            email_message.send()

            return Response({'message': 'User registered successfully. Check your email for verification.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def hr_login(request):
    if request.method == 'POST':
        serializer = HRLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                user = HRModel.objects.get(username=username)
            except HRModel.DoesNotExist:
                user = None

            if user is not None and check_password(password, user.password):
                if user.is_verified: 
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)

                     # Store the access token in the database
                    user.access_token = access_token
                    user.save()

                    return Response({'id': user.id,'access_token': access_token}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'User not verified'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def hr_verify_user(request, token):
    user = get_object_or_404(HRModel, verification_token=token)
    

    if not user.is_verified and user.token_expires_at > timezone.now():
        user.is_verified = True
        user.save()
        return redirect('hr_verification_success')  
    elif user.is_verified:
        return Response({'message': 'Account already verified.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Verification link has expired.'}, status=status.HTTP_400_BAD_REQUEST)

def hr_verification_success(request):
    return render(request, 'verification_success.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def hr_forgot_password(request):
    if request.method == 'POST':
        email = request.data.get('email')

        user = get_object_or_404(HRModel, officialEmail=email)

        reset_token = secrets.token_urlsafe(16)
        expires_at = timezone.now() + timezone.timedelta(hours=1)
        HrPasswordResetModel.objects.create(user=user, token=reset_token, expires_at=expires_at)

        subject = 'Password Reset'
        message = render_to_string('password_reset_email_template.html', {
            'user': user,
            'reset_token': reset_token,
            'reset_link': request.build_absolute_uri(reverse('hr_reset_password', kwargs={'token': reset_token})),
        })

        email_message = EmailMessage(subject, strip_tags(message), 'your_email@gmail.com', [user.officialEmail])
        email_message.content_subtype = 'html'
        email_message.send()

        return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def hr_reset_password(request, token):
    if request.method == 'POST':
        password = request.data.get('password')
        reset_instance = get_object_or_404(HrPasswordResetModel, token=token, expires_at__gt=timezone.now())

        user = reset_instance.user
        user.password = make_password(password)
        user.save()

        reset_instance.delete()

        return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_hr(request, pk):
    obj = get_object_or_404(HRModel, pk=pk)
    serializer = HRSerializer(obj, data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_hrs(request):
    objects = HRModel.objects.all()
    serializer = HRSerializer(objects, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_hr(request, pk):
    obj = get_object_or_404(HRModel, pk=pk)
    serializer = HRSerializer(obj, context={'request': request})
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_hr(request, pk):
    obj = get_object_or_404(HRModel, pk=pk)
    obj.delete()
    return Response(status=204)


# -------------------------------------------------------


@api_view(['POST'])
def create_tpo(request):
    if request.method == 'POST':
        serializer = TPOSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['officialMailId']
            
            # Extracting domain from the email address
            domain = re.split('@', email)[1].lower()

            # List of restricted email domains
            restricted_domains = ['gmail.com', 'yahoo.com']

            # Check if the email domain is restricted
            if domain in restricted_domains:
                return Response({'error': 'Registration with this email domain is not allowed.'}, status=status.HTTP_400_BAD_REQUEST)


            idProof_image_data = request.data.get('profile_image')
            if idProof_image_data:
                try:
                    format, imgstr = idProof_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_idProof_image.{ext}")
                    serializer.validated_data['idProof_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid ID Image format'}, status=status.HTTP_400_BAD_REQUEST)


            profile_image_data = request.data.get('profile_image')
            if profile_image_data:
                try:
                    # Decode base64 image data and save it as a profile image
                    format, imgstr = profile_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_profile_image.{ext}")
                    serializer.validated_data['profile_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid profile image format'}, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.save()
            user.verification_token = secrets.token_urlsafe(16)
            user.save()

            subject = 'Account Verification'
            message = render_to_string('verification_email_template.html', {
                'user': user,
                'verification_token': user.verification_token,
                'verification_link': request.build_absolute_uri(reverse('tpo_verify_user', kwargs={'token': user.verification_token})),
            })

            email_message = EmailMessage(subject, strip_tags(message), 'your_email@gmail.com', [user.officialMailId])
            email_message.content_subtype = 'html'
            email_message.send()

            return Response({'message': 'User registered successfully. Check your email for verification.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def tpo_login(request):
    if request.method == 'POST':
        serializer = TPOLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            try:
                user = TPOModel.objects.get(username=username)
            except TPOModel.DoesNotExist:
                user = None

            if user is not None and check_password(password, user.password):
                if user.is_verified: 
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)

                    user.access_token = access_token
                    user.save()
                    return Response({'id': user.id,'access_token': access_token}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'User not verified'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def tpo_verify_user(request, token):
    user = get_object_or_404(TPOModel, verification_token=token)
    

    if not user.is_verified and user.token_expires_at > timezone.now():
        user.is_verified = True
        user.save()
        return redirect('tpo_verification_success')  
    elif user.is_verified:
        return Response({'message': 'Account already verified.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': 'Verification link has expired.'}, status=status.HTTP_400_BAD_REQUEST)

def tpo_verification_success(request):
    return render(request, 'verification_success.html')


@api_view(['POST'])
@permission_classes([AllowAny])
def tpo_forgot_password(request):
    if request.method == 'POST':
        email = request.data.get('email')

        user = get_object_or_404(TPOModel, officialMailId=email)

        reset_token = secrets.token_urlsafe(16)
        expires_at = timezone.now() + timezone.timedelta(hours=1)
        TPOPasswordResetModel.objects.create(user=user, token=reset_token, expires_at=expires_at)

        subject = 'Password Reset'
        message = render_to_string('password_reset_email_template.html', {
            'user': user,
            'reset_token': reset_token,
            'reset_link': request.build_absolute_uri(reverse('tpo_reset_password', kwargs={'token': reset_token})),
        })

        email_message = EmailMessage(subject, strip_tags(message), 'your_email@gmail.com', [user.officialMailId])
        email_message.content_subtype = 'html'
        email_message.send()

        return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
def tpo_reset_password(request, token):
    if request.method == 'POST':
        password = request.data.get('password')
        reset_instance = get_object_or_404(TPOPasswordResetModel, token=token, expires_at__gt=timezone.now())

        user = reset_instance.user
        user.password = make_password(password)
        user.save()

        reset_instance.delete()

        return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
def update_tpo(request, pk):
    obj = get_object_or_404(TPOModel, pk=pk)
    serializer = TPOSerializer(obj, data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_tpos(request):
    objects = TPOModel.objects.all()
    serializer = TPOSerializer(objects, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_tpo(request, pk):
    obj = get_object_or_404(TPOModel, pk=pk)
    serializer = TPOSerializer(obj, context={'request': request})
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_tpo(request, pk):
    obj = get_object_or_404(TPOModel, pk=pk)
    obj.delete()
    return Response(status=204)


# -------------------------------------------

@api_view(['GET'])
def combined_count(request):
    student_count = StudentModel.objects.count()
    hr_count = HRModel.objects.count()
    hrjobposting_count = JobPosting.objects.count()
    tpo_count = TPOModel.objects.count()

    response_data = {
        'student_count': student_count,
        'hr_count': hr_count,
        'hrjobposting_count': hrjobposting_count,
        'tpo_count': tpo_count,
    }

    return Response(response_data)


# --------Admin-------------------


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)  
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ------------------------------------------------------------------------------------------
@api_view(['POST'])
def create_blockprofile(request):
    serializer = BlockProfileSerializer(data=request.data)
    if serializer.is_valid():
            profile_image_data = request.data.get('profile_image')
            if profile_image_data:
                try:
                    format, imgstr = profile_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['fullName']}_profile_image.{ext}")
                    serializer.validated_data['profile_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid profile image format'}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_blockprofile(request, pk):
    obj = get_object_or_404(BlockProfileModel, pk=pk)
    serializer = BlockProfileSerializer(obj, data=request.data, context={'request': request},partial=True)
    if serializer.is_valid():
        profile_image_data = request.data.get('profile_image')
        if profile_image_data:
            # Decode base64 image data and save it as a profile image
            format, imgstr = profile_image_data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['username']}_profile_image.{ext}")
            serializer.validated_data['profile_image'] = data

        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_blockprofiles(request):
    objects = BlockProfileModel.objects.all()
    serializer = BlockProfileSerializer(objects, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_blockprofile(request, pk):
    obj = get_object_or_404(BlockProfileModel, pk=pk)
    serializer = BlockProfileSerializer(obj, context={'request': request})
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_blockprofile(request, pk):
    image = get_object_or_404(BlockProfileModel, pk=pk)
    image.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# --------------------------------------------------------------
@api_view(['POST'])
def create_keymoments(request):
    serializer = KeyMomentSerializer(data=request.data)
    if serializer.is_valid():
        profile_image_data = request.data.get('profile_image')
        if profile_image_data:
            try:
                format, imgstr = profile_image_data.split(';base64,')
                ext = format.split('/')[-1]
                data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['fullName']}_profile_image.{ext}")
                serializer.validated_data['profile_image'] = data
            except Exception as e:
                return Response({'message': 'Invalid profile image format'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return JsonResponse(serializer.data, status=201, safe=False)
    return JsonResponse(serializer.errors, status=400)

@api_view(['PUT'])
def update_keymoments(request, id):
    image = get_object_or_404(KeyMomentsModel, id=id)
    serializer = KeyMomentSerializer(instance=image, data=request.data,partial=True)
    if serializer.is_valid():
        image_file = request.data.get('image', None)
        if image_file:
            file_name = default_storage.save(image_file.name, ContentFile(image_file.read()))
            serializer.validated_data['image'] = file_name
        serializer.save()
        return JsonResponse(serializer.data, status=200)
    return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def get_keymoments(request):
    objects = KeyMomentsModel.objects.all()
    serializer = KeyMomentSerializer(objects, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
def get_keymoment_by_id(request, id):
    image = get_object_or_404(KeyMomentsModel, id=id)
    serializer = KeyMomentSerializer(image, context={'request': request})
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_keymoments(request, id):
    image = get_object_or_404(KeyMomentsModel, id=id)
    image.delete()
    return JsonResponse({'message': 'Image deleted successfully!'}, status=204)


# -----------------------------------------------------------------------------------

@api_view(['POST'])
def create_contact(request):
    serializer =  ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'contact created successfully!'},status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_contacts(request):
    objects = contactModel.objects.all()
    serializer = ContactSerializer(objects, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_contact(request, pk):
    obj = get_object_or_404(contactModel, pk=pk)
    obj.delete()
    return Response(status=204)

# -----------------------------------------------------------
@api_view(['POST'])
def post_job(request, hr_id):   
    serializer = JobPostingSerializer(data=request.data)
    if serializer.is_valid():           
            profile_image_data = request.data.get('profile_image')
            if profile_image_data:
                try:
                    format, imgstr = profile_image_data.split(';base64,')
                    ext = format.split('/')[-1]
                    data = ContentFile(base64.b64decode(imgstr), name=f"{serializer.validated_data['contactPerson']}_profile_image.{ext}")
                    serializer.validated_data['profile_image'] = data
                except Exception as e:
                    return Response({'message': 'Invalid profile image format'}, status=status.HTTP_400_BAD_REQUEST)
        
            serializer.save(hr_id=hr_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def approve_job(request, job_id):
    try:
        job_posting = JobPosting.objects.get(pk=job_id)
    except JobPosting.DoesNotExist:
        return Response({'message': 'Job Post not found!'}, status=status.HTTP_404_NOT_FOUND)

    job_posting.approved = True
    job_posting.save()

    serializer = JobPostingSerializer(job_posting)
    return Response({'message': 'Job Post Approved!', 'data': serializer.data}, status=201)

@api_view(['PUT'])
def reject_job(request, job_id):
    try:
        job_posting = JobPosting.objects.get(pk=job_id)
    except JobPosting.DoesNotExist:
        return Response({'message': 'Job Post not found!'}, status=status.HTTP_404_NOT_FOUND)

    job_posting.approved = False
    job_posting.save()

    serializer = JobPostingSerializer(job_posting)
    return Response({'message': 'Job Post Rejected!', 'data': serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def hr_dashboard(request, hr_id):
    hr_instance = get_object_or_404(HRModel, id=hr_id)
    job_postings = JobPosting.objects.filter(hr_id=hr_instance)
    serializer = JobPostingSerializer(job_postings, many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def all_approved_job_posts(request):
    approved_job_postings = JobPosting.objects.filter(approved=True)
    approved_serializer = JobPostingSerializer(approved_job_postings, many=True, context={'request': request})

    response_data = {
        'approved_job_postings': approved_serializer.data,
        'total_approved_posts': approved_job_postings.count(),
    }

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def apply_for_job(request, job_id):
    try:
        job_posting = JobPosting.objects.get(pk=job_id, approved=True)
    except JobPosting.DoesNotExist:
        return Response({'message': 'Job Post not found or not approved!'}, status=status.HTTP_404_NOT_FOUND)

    serializer = JobApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(job_posting=job_posting)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def student_applied_jobs(request, student_id):
    try:
        student_applied_jobs = JobApplication.objects.filter(student_id=student_id)
        serializer = JobApplicationSerializer(student_applied_jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except StudentModel.DoesNotExist:
        return Response({'message': 'Student not found!'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_all_hrs_job_posts(request):
    objects = JobPosting.objects.all()
    serializer = JobPostingSerializer(objects, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def get_hr_job_posts_by_id(request, id):
    obj = get_object_or_404(JobPosting, id=id)
    serializer = JobPostingSerializer(obj, context={'request': request})
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_hr_job_post(request, id):
    obj = get_object_or_404(JobPosting, id=id)
    obj.delete()
    return JsonResponse({'message': 'Post deleted successfully!'}, status=204)
# -------------------------------------------------------------------------------

@api_view(['POST'])
def post_tpo(request, tpo_id):
    serializer = TPOCampusDriveSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save(tpo_id=tpo_id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_tpo_posts(request):
    obj= TPOCampusDrive.objects.all()
    serializer = TPOCampusDriveSerializer(obj,many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_tpo_posts_by_id(request, tpo_id):
    tpo_instance = get_object_or_404(TPOModel, id=tpo_id)
    job_postings = TPOCampusDrive.objects.filter(tpo_id=tpo_instance)
    serializer = TPOCampusDriveSerializer(job_postings, many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['DELETE'])
def delete_tpo_post(request, id):
    try:
        tpo_post = TPOCampusDrive.objects.get(id=id)
    except TPOCampusDrive.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    tpo_post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


