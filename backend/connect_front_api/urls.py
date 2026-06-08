from django.urls import path
from . import views

urlpatterns = [
    path('get-quiz/', views.get_quiz, name='get_quiz'),
    path('upload-files/',views.upload_files,name='upload_files'),
]