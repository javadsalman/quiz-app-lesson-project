from rest_framework import serializers
from .models import Question, Option, QuizResult

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['content', 'iscorrect']
        

class QuestionSerialiser(serializers.ModelSerializer):
    options = OptionSerializer(read_only=True, many=True)
    class Meta:
        model = Question
        fields = '__all__'
