from django.shortcuts import get_object_or_404
from rest_framework import generics, status, parsers
from rest_framework.response import Response
from .serializers import (
    QuestionSerializer, OptionSerializer, QuizResultSerializer
)
from rest_framework.decorators import api_view
from .models import Question, Option, QuizResult
from time import sleep


# Create your views here.
class QuestionListAV(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuestionDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    
    def retrieve(self, request, *args, **kwargs):
        print('RESULT', self.get_object().get_right_answers())
        return super().retrieve(request, *args, **kwargs)
    
class QuizResultListAV(generics.ListCreateAPIView):
    queryset = QuizResult.objects.all()
    serializer_class = QuizResultSerializer
    

class QuizResultDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuizResult.objects.all()
    serializer_class = QuizResultSerializer

    
