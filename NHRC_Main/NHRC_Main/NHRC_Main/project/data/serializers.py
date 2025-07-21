from rest_framework import serializers
from .models import HrPasswordResetModel, JobApplication, JobPosting, PodcastModel, StudentModel,HRModel, StudentPasswordResetModel, TPOCampusDrive,TPOModel,BlockProfileModel, KeyMomentsModel, TPOPasswordResetModel, contactModel
from django.contrib.auth.hashers import make_password
from .models import CustomUser


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastModel
        fields = ('id', 'image', 'description', 'created_at')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentModel
        fields = '__all__'

    def get_profilePic_url(self, obj):
        if obj.profilePic:
            return self.context['request'].build_absolute_uri(obj.profilePic.url)
        return None    
    
    
    def get_studentIdProof_url(self, obj):
        if obj.studentIdProof:
            return self.context['request'].build_absolute_uri(obj.studentIdProof.url)
        return None
    

    def create(self, validated_data):
            validated_data['password'] = make_password(validated_data.get('password'))
            return super(StudentSerializer, self).create(validated_data)

class StudentLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class StudentPasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentPasswordResetModel
        fields = '__all__'

class HRSerializer(serializers.ModelSerializer):
    class Meta:
        model = HRModel
        fields = '__all__'

    def get_profilePic_url(self, obj):
        if obj.profilePic:
            return self.context['request'].build_absolute_uri(obj.profilePic.url)
        return None     

    def create(self, validated_data):
            validated_data['password'] = make_password(validated_data.get('password'))
            return super(HRSerializer, self).create(validated_data)

class HRLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class HrPasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrPasswordResetModel
        fields = '__all__'

class TPOSerializer(serializers.ModelSerializer):
    class Meta:
        model = TPOModel
        fields = '__all__'

    def get_profilePic_url(self, obj):
            if obj.profilePic:
                return self.context['request'].build_absolute_uri(obj.profilePic.url)
            return None

    def get_idProof_url(self, obj):
            if obj.idProof:
                return self.context['request'].build_absolute_uri(obj.idProof.url)
            return None


    def create(self, validated_data):
            validated_data['password'] = make_password(validated_data.get('password'))
            return super(TPOSerializer, self).create(validated_data)

class TPOLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()    

class TPOPasswordResetSerializer(serializers.Serializer):
     class Meta:
          model = TPOPasswordResetModel
          fields = '__all__'

# class HRJobPostingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = HRJobPostingModel
#         fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    
    def create(self, validated_data):
            validated_data['password'] = make_password(validated_data.get('password'))
            return super(UserSerializer, self).create(validated_data)
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
       
class BlockProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlockProfileModel
        fields = '__all__'    

    def get_profilePic_url(self, obj):
        if obj.profileImage:
            return self.context['request'].build_absolute_uri(obj.profileImage.url)
        return None    

class KeyMomentSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyMomentsModel
        fields = '__all__'

    def get_profilePic_url(self,obj):
         if obj.keyMomentImage:
              return self.context['request'].build_absolute_uri(obj.keyMomentImage.url)
         return None
  
class ContactSerializer(serializers.ModelSerializer):
     class Meta:
          model = contactModel
          fields = '__all__'
     

class JobPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = '__all__'

    def get_profilePic_url(self, obj):
        if obj.companylogo:
            return self.context['request'].build_absolute_uri(obj.companylogo.url)
        return None     



class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'


class  TPOCampusDriveSerializer(serializers.ModelSerializer):
     class Meta:
          model = TPOCampusDrive
          fields = '__all__'
        