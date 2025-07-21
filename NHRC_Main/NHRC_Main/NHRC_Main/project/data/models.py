from django.db import models
from django.utils import timezone
import secrets
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from datetime import timedelta,datetime
from django.db import models


class PodcastModel(models.Model):
    image = models.ImageField(upload_to='images/')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class StudentModel(models.Model):
    fullName = models.CharField(max_length=55)
    dateOfBirth =models.DateField(max_length=55)
    gender = models.CharField(max_length=55)
    profilePic= models.ImageField(upload_to='profilePic/')
    state= models.CharField(max_length=55)
    district= models.CharField(max_length=55)
    pincode= models.IntegerField()
    personalMail= models.EmailField(max_length=55,unique=True)
    mobileNumber= models.CharField(max_length=10)
    universityName= models.CharField(max_length=255)
    collegeName= models.CharField(max_length=55)
    qualification= models.CharField(max_length=55)
    department= models.CharField(max_length=55)
    passOut= models.IntegerField()
    location= models.CharField(max_length=255)
    studentIdProof = models.ImageField(upload_to='StudentIdProof/')
    username = models.CharField(max_length=255,unique=True)
    password = models.CharField(max_length=255)

    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)
    token_expires_at = models.DateTimeField(null=True, blank=True)
    access_token = models.CharField(max_length=255, null=True, blank=True)

    
    def save(self, *args, **kwargs):
        if not self.verification_token:
            self.verification_token = secrets.token_urlsafe(16)
        if not self.token_expires_at:
            expiration_time = timezone.now() + timezone.timedelta(hours=24)
            self.token_expires_at = expiration_time

        super().save(*args, **kwargs)
    
    


    def __str__(self):
        return self.fullName      

class HRModel(models.Model):
    fullName = models.CharField(max_length=55)
    gender = models.CharField(max_length=55)
    dateOfBirth =models.DateField(max_length=55)
    state= models.CharField(max_length=55)
    district= models.CharField(max_length=55)
    pincode= models.IntegerField()
    profilePic= models.ImageField(upload_to='profilePic/')
    email= models.EmailField(max_length=55,unique=True)
    mobileNumber= models.CharField(max_length=10)
    oraganizationName= models.CharField(max_length=255)
    industry = models.CharField(max_length=55)
    department= models.CharField(max_length=55)
    designation= models.CharField(max_length=55)
    companyUrl = models.URLField(max_length=55)
    workingLocation= models.CharField(max_length=255)
    companyStrength = models.CharField(max_length=255)
    employeeId = models.IntegerField()
    experience= models.IntegerField()
    officialEmail = models.EmailField(max_length=255,unique=True)
    username = models.CharField(max_length=255,unique=True)
    password = models.CharField(max_length=255)

    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)
    token_expires_at = models.DateTimeField(null=True, blank=True)
    access_token = models.CharField(max_length=255, null=True, blank=True)

    
    def save(self, *args, **kwargs):
        if not self.token_expires_at:
            expiration_time = timezone.now() + timezone.timedelta(hours=24)
            self.token_expires_at = expiration_time
        super().save(*args, **kwargs)

    def __str__(self):
        return self.fullName
    
class TPOModel(models.Model):
    firstName  = models.CharField(max_length=55)
    lastName  = models.CharField(max_length=55)
    mobile= models.CharField(max_length=10)
    gender = models.CharField(max_length=55)
    age= models.IntegerField()
    profilePic = models.ImageField(upload_to='tpoimages/')
    birth =models.DateField(max_length=55)
    state= models.CharField(max_length=55)
    district= models.CharField(max_length=55)
    pincode= models.IntegerField()
    collegeName= models.CharField(max_length=255)
    university  = models.CharField(max_length=55)
    eamcetRank = models.IntegerField()
    branch = models.CharField(max_length=55)
    location= models.CharField(max_length=255)  
    experience= models.IntegerField()
    idProof= models.ImageField(upload_to='idProof/')
    email = models.EmailField(max_length=255,unique=True)
    officialMailId = models.EmailField(max_length=255,unique=True)
    username = models.CharField(max_length=255,unique=True)
    password = models.CharField(max_length=255)

    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=255, blank=True, null=True)
    token_expires_at = models.DateTimeField(null=True, blank=True)
    access_token = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.token_expires_at:
            expiration_time = timezone.now() + timezone.timedelta(hours=24)
            self.token_expires_at = expiration_time
        super().save(*args, **kwargs)

    def __str__(self):
        return self.firstName    
    

class CustomUser(AbstractUser):
    
    email = models.EmailField(unique=True)


    def __str__(self):
        return self.username    

class BlockProfileModel(models.Model):
    profileImage = models.ImageField(upload_to='BlockProfileImages/')
    fullName = models.CharField(max_length=55)
    aadharCardNumber= models.CharField(max_length=55)
    panNumber= models.CharField(max_length=55)
    uniNumber= models.IntegerField()
    date = models.DateTimeField(null=True, blank=True)
    remarks = models.TextField()

class KeyMomentsModel(models.Model):
    keyMomentImage = models.ImageField(upload_to='KeyMomentimages/')

class contactModel(models.Model):
    firstName     = models.CharField(max_length=255)
    lastName      = models.CharField(max_length=255)
    mobileNumber  = models.CharField(max_length=10)
    emailId       = models.EmailField(max_length=55)
    content       = models.TextField(max_length=500)

class StudentPasswordResetModel(models.Model):
    user          = models.ForeignKey(StudentModel, on_delete=models.CASCADE)
    token         = models.CharField(max_length=255, unique=True)
    expires_at    = models.DateTimeField()

    def is_expired(self):
        return self.expires_at <= timezone.now()

class HrPasswordResetModel(models.Model):
    user          = models.ForeignKey(HRModel, on_delete=models.CASCADE)
    token         = models.CharField(max_length=255, unique=True)
    expires_at    = models.DateTimeField()

    def is_expired(self):
        return self.expires_at <= timezone.now()
    
class TPOPasswordResetModel(models.Model):
    user         = models.ForeignKey(TPOModel,on_delete=models.CASCADE)
    token        = models.CharField(max_length=255,unique=True)
    expires_at   = models.DateTimeField()

    def is_expired(self):
        return self.expires_at <= timezone.now()

class JobPosting(models.Model):
    hr = models.ForeignKey(HRModel, on_delete=models.CASCADE)
    jobTitle = models.TextField()
    jobDescription = models.TextField()
    department= models.CharField(max_length=55)
    state=models.CharField(max_length=55)
    district= models.CharField(max_length=55)
    address= models.CharField(max_length=255)
    employmentType= models.CharField(max_length=255)
    shiftType= models.CharField(max_length=55)
    salaryFrom= models.CharField(max_length=55)
    salaryEnd= models.CharField(max_length=55)
    experienceLevel  = models.CharField(max_length=55)
    educationLevel   = models.CharField(max_length=55)
    qualifications = models.CharField(max_length=55)
    contactPerson= models.CharField(max_length=255)
    contactEmail= models.EmailField(max_length=55)
    contactPhone = models.CharField(max_length=10)
    applicationDeadline = models.DateField()
    jobResponsibilities= models.TextField()
    skillsRequired= models.TextField()
    companyName= models.CharField(max_length=55)
    companyLevel= models.CharField(max_length=55)
    foundedIn = models.IntegerField()
    companylogo= models.ImageField(upload_to='companylogo/')
    companyDescription= models.TextField()
    howtoApply= models.TextField()
    websiteUrl= models.CharField(max_length=255)
    approved = models.BooleanField(default=False)
    approved_date = models.DateTimeField(null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if self.approved and not self.approved_date:
            self.approved_date = datetime.now()
        super(JobPosting, self).save(*args, **kwargs)


class JobApplication(models.Model):
    job_posting  = models.ForeignKey(JobPosting, on_delete=models.CASCADE)
    student      = models.ForeignKey(StudentModel, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=255)
    resume       = models.FileField(upload_to='resumes/')
    cover_letter = models.TextField()
    application_date = models.DateTimeField(auto_now_add=True)

class TPOCampusDrive(models.Model):
    tpo          = models.ForeignKey(TPOModel,on_delete=models.CASCADE)
    collegeName  = models.CharField(max_length=255)
    collegeAddress        = models.TextField()
    qualification = models.CharField(max_length=255)
    branch = models.CharField(max_length=255)
    noOfStudent = models.IntegerField()
    jobType = models.CharField(max_length=255)
