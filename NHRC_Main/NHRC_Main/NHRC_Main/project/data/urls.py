
from django.urls import path
from .views import   all_approved_job_posts, apply_for_job,  create_blockprofile, create_contact, create_keymoments, delete_blockprofile, delete_contact, delete_hr_job_post, delete_keymoments, delete_tpo_post, get_all_hrs_job_posts, get_all_tpo_posts,  get_blockprofile, get_blockprofiles, get_contacts, get_hr_job_posts_by_id, get_keymoment_by_id, get_keymoments,  get_tpo_posts_by_id,   hr_forgot_password, hr_reset_password, post_tpo, student_applied_jobs,  student_forgot_password,  student_login,change_password, register_user, student_reset_password, tpo_forgot_password, tpo_reset_password, update_blockprofile, update_keymoments, user_login, user_logout
from .views import get_image, create_image, update_image, delete_image,get_images,student_login,student_verify_user,student_verification_success
from .views import get_students, get_student, create_student, update_student, delete_student, hr_verification_success,hr_verify_user,hr_login, get_hrs, get_hr, create_hr, update_hr, delete_hr,tpo_login,tpo_verify_user,tpo_verification_success,  get_tpos, get_tpo, create_tpo, update_tpo, delete_tpo,  combined_count
from django.conf import settings
from django.conf.urls.static import static
from .views import hr_dashboard, post_job, approve_job, reject_job

urlpatterns = [
    path('podcast/<int:image_id>/', get_image, name='get_image'),
    path('podcast/create/', create_image, name='create_image'),
    path('podcast/update/<int:image_id>/', update_image, name='update_image'),
    path('podcast/delete/<int:image_id>/', delete_image, name='delete_image'),
    path('podcast/', get_images, name='get_images'),

    path('student/create/', create_student, name="create_student"),
    path('student/login/', student_login, name='student_login'),
    path('student/verify/<str:token>/', student_verify_user, name='student_verify_user'),
    path('student/verification-success/', student_verification_success, name='student_verification_success'),
    path('student/', get_students, name="get_students"),
    path('student/<int:pk>/', get_student, name="get_student"),
    path('student/update/<int:pk>/', update_student, name="update_student"),
    path('student/delete/<int:pk>/', delete_student, name="delete_student"),

    path('student/forgot-password/', student_forgot_password, name='forgot_password'),
    path('student/reset-password/<str:token>/', student_reset_password, name='reset_password'),
    
    path('hr/create/', create_hr, name="create_hr"),
    path('hr/login/', hr_login, name='hr_login'),
    path('hr/verify/<str:token>/', hr_verify_user, name='hr_verify_user'),
    path('hr/verification-success/', hr_verification_success, name='hr_verification_success'),
    path('hr/', get_hrs, name="get_hrs"),
    path('hr/<int:pk>/', get_hr, name="get_hr"),
    path('hr/update/<int:pk>/', update_hr, name="update_hr"),
    path('hr/delete/<int:pk>/', delete_hr, name="delete_hr"),
    
    path('hr/forgot-password/', hr_forgot_password, name='hr_forgot_password'),
    path('hr/reset-password/<str:token>/', hr_reset_password, name='hr_reset_password'),

    path('tpo/create/', create_tpo, name="create_tpo"),
    path('tpo/login/', tpo_login, name='tpo_login'),
    path('tpo/verify/<str:token>/', tpo_verify_user, name='tpo_verify_user'),
    path('tpo/verification-success/', tpo_verification_success, name='tpo_verification_success'),
    path('tpo/', get_tpos, name="get_tpos"),
    path('tpo/<int:pk>/', get_tpo, name="get_tpo"),
    path('tpo/update/<int:pk>/', update_tpo, name="update_tpo"),
    path('tpo/delete/<int:pk>/', delete_tpo, name="delete_tpo"),

    path('tpo/forgot-password/', tpo_forgot_password, name='tpo_forgot_password'),
    path('tpo/reset-password/<str:token>/', tpo_reset_password, name='tpo_reset_password'),

    path('tpo/create_post/<int:tpo_id>/',post_tpo, name= "post_tpo"),
    path('tpo/get_post/',get_all_tpo_posts , name="get_all_tpo_posts"),
    path('delete_tpo_post/<int:id>/', delete_tpo_post, name="delete_tpo_post"),
    path('tpo/get_post/<int:tpo_id>/', get_tpo_posts_by_id, name="get_tpo_posts_by_id"),


   

    path('combined_count/', combined_count,name="combined_count"),
    
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('change_password/', change_password, name='change_password'),

    path('blockprofiles/', get_blockprofiles, name="get_blockprofiles"),
    path('blockprofile/<int:pk>/', get_blockprofile, name="get_blockprofile"),
    path('blockprofile/create/', create_blockprofile, name="create_blockprofile"),
    path('blockprofile/update/<int:pk>/', update_blockprofile, name="update_blockprofile"),
    path('blockprofile/delete/<int:pk>/', delete_blockprofile, name="delete_blockprofile"),

    path('keymoments/', get_keymoments, name='get_keymoments'),
    path('keymoments/<int:id>/', get_keymoment_by_id, name='get_keymoment_by_id'),
    path('keymoments/create/', create_keymoments, name='create_keymoment'),
    path('keymoments/update/<int:id>/', update_keymoments, name='update_keymoment'),
    path('keymoments/delete/<int:id>/', delete_keymoments, name='delete_keymoment'),

    path('contact/create/', create_contact, name='create_contact'),
    path('contact/', get_contacts, name="get_contacts"),
    path('contact/delete/<int:pk>/', delete_contact, name="delete_contact"),

    path('hr/dashboard/<int:hr_id>/', hr_dashboard, name='hr_dashboard'),
    path('hr/post/<int:hr_id>/', post_job, name='post_job'),
    path('admin/approve/<int:job_id>/', approve_job, name='approve_job'),
    path('admin/reject/<int:job_id>/', reject_job, name='reject_job'),
    path('hr/all_approved_job_posts/',all_approved_job_posts, name='all_approved_job_posts'),

    path('apply_for_job/<int:job_id>/', apply_for_job, name='apply_for_job'),
    path('hr/jobposts/', get_all_hrs_job_posts, name="get_all_hrs_job_posts"),
    path('hr/jobposts/delete/<int:id>/', delete_hr_job_post, name="delete_hr_job_post"),
    path('hr/jobposts/<int:id>/', get_hr_job_posts_by_id, name="get_hr_job_posts_by_id"),
    path('student/applied-jobs/<int:student_id>/', student_applied_jobs, name='student_applied_jobs'),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


