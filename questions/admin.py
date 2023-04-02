from django.contrib import admin

from questions.models import Question, Message, Answer, Quiz

admin.site.register(Quiz, list_display=["quiz", ])
admin.site.register(Question, list_display=["question", "question_quiz"])
admin.site.register(Message, list_display=["name", "email", "created_on"])
admin.site.register(Answer, list_display=["value", "question"])
