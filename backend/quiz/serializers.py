from rest_framework import serializers
from .models import Question, Option, QuizResult

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'content', 'iscorrect']
        

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    class Meta:
        model = Question
        fields = '__all__'
        
    def create(self, validated_data):
        options_data = validated_data.pop('options')
        question = Question.objects.create(**validated_data)
        bulk = [Option(**option_data, question=question) for option_data in options_data]
        Option.objects.bulk_create(bulk)
        return question
    
    def update(self, question, validated_data):
        question.content = validated_data.get('content')
        question.index = validated_data.get('index')
        question.save()
        question.options.all().delete()
        options_data = validated_data.pop('options')
        bulk = [Option(**option_data, question=question) for option_data in options_data]
        Option.objects.bulk_create(bulk)
        return question
    
    def validate(self, data):
        opitons = data.get('options')
        has_true = False
        has_false = False
        for option in opitons:
            if option.get('iscorrect'):
                has_true = True
            elif option.get('iscorrect') == False:
                has_false = True
                
            if has_true and has_false:
                break
            
        if not has_true:
            raise serializers.ValidationError('Variantlardan en az biri true olmalidir!')
        if not has_false:
            raise serializers.ValidationError('Variantlardan en az biri false olmalidir!')
        
        return data
        

class QuizResultSerializer(serializers.ModelSerializer):
    answers = serializers.JSONField(write_only=True)
    created = serializers.DateTimeField(format='%B %d, %Y %H:%M:%S', read_only=True)
    class Meta:
        model = QuizResult
        fields = '__all__'
        extra_kwargs = {
            'total_question': {'required': False},
            'right_answers': {'required': False},
            'wrong_answers': {'required': False},
        }
        
        
    def create(self, validated_data):
        quizresult = QuizResult()
        quizresult.student_name = validated_data.get('student_name')
        answers = validated_data.get('answers')
        total_question = len(answers)
        right_answers = 0
        wrong_answers = 0
        for answer in answers:
            question_id = answer.get('question')
            selected_options = answer.get('selected_options')
            question = Question.objects.get(pk=question_id)
            if selected_options:
                answer_result = question.check_answers(selected_options)
                if answer_result:
                    right_answers += 1
                else:
                    wrong_answers += 1
                    
        quizresult.total_question = total_question
        quizresult.right_answers = right_answers
        quizresult.wrong_answers = wrong_answers
        quizresult.save()
        return quizresult
        

        
        
        
        