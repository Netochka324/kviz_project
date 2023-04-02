from django.urls import path
from . import views

urlpatterns = [
    path('', views.questions_index, name='questions_index'),
    # path('contacts/', views.contacts, name='contacts'),
    path('<int:id>/', views.questions_detail, name='questions_detail')
]