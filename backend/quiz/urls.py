from django.urls import path
from . import views

urlpatterns = [
    path('questions/', views.QuestionListAV.as_view(), name='question-list'),
    path('questions/<int:pk>/', views.QuestionDetailAV.as_view(), name='question-detail'),
    path('quizresults/', views.QuizResultListAV.as_view(), name='quiz-result-list'),
    path('quizresults/<int:pk>/', views.QuizResultDetailAV.as_view(), name='quiz-result-detail'),
]
