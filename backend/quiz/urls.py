from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.QuestionListAV.as_view(), name='question-list'),
    path('questions/<int:pk>/', views.QuestionDetailAV.as_view(), name='question-detail'),
    path('add-question/', views.add_question, name='add-question'),
    path('update-question/<int:pk>/', views.update_question, name='update-question'),
]
