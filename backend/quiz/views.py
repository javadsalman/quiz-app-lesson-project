from django.shortcuts import get_object_or_404
from rest_framework import generics, status, parsers
from rest_framework.response import Response
from .serializers import (
    QuestionSerialiser, OptionSerializer
)
from rest_framework.decorators import api_view
from .models import Question, Option


# Create your views here.
class QuestionListAV(generics.ListAPIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    queryset = Question.objects.all()
    serializer_class = QuestionSerialiser


@api_view(['POST'])
def add_question(request):
    question_info = request.data.get('question_info')
    options_info = request.data.get('options_info')
    questionserializer = QuestionSerialiser(data=question_info)
    if questionserializer.is_valid():
        question = questionserializer.save()
    else:
        return Response(questionserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    bulk = [ Option(**option_info, question=question) for option_info in options_info]
    objs = Option.objects.bulk_create(bulk)
    
    
    # for option_info in options_info:
    #     option = Option(**option_info, question=question)
    #     option.save()
    return Response(questionserializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def update_question(request, pk):
    question = get_object_or_404(Question, pk=pk)
    question_info = request.data.get('question_info')
    options_info = request.data.get('options_info')
    questionserializer = QuestionSerialiser(data=question_info, instance=question)
    if questionserializer.is_valid():
        questionserializer.save()
    else:
        return Response(questionserializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    question.options.all().delete()
    
    bulk = []
    for option_info in options_info:
        option_info['question'] = question
        option_serializer = OptionSerializer(data=option_info)
        if not option_serializer.is_valid():
            return Response(option_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        option = Option(**option_info)
        bulk.append(option)
    Option.objects.bulk_create(bulk)
    
    return Response(questionserializer.data, status=status.HTTP_202_ACCEPTED)
    

    

class QuestionDetailAV(generics.RetrieveDestroyAPIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    queryset = Question.objects.all()
    serializer_class = QuestionSerialiser