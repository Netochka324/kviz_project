from django.urls import path
from . import views

urlpatterns = [

    path('', views.contacts, name='contacts'),
    path('questions_index/', views.questions_index, name='questions_index'),
    path('<int:pk>/', views.questions_detail, name='questions_detail')
]