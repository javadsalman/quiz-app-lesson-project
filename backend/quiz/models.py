from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.

    
class Question(models.Model):
    content = models.TextField()
    index = models.IntegerField(validators=[MinValueValidator(1)])


class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    content = models.TextField()
    iscorrect = models.BooleanField(default=False)
    
    
class QuizResult(models.Model):
    student_name = models.CharField(max_length=100)
    total_question = models.IntegerField()
    right_answers = models.IntegerField()
    wrong_answers = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)