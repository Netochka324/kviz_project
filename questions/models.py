from django.db import models


class Quiz(models.Model):
    quiz = models.CharField(max_length=10)

    class Meta:
        verbose_name = "Квиз"
        verbose_name_plural = "Квизы"
        ordering = ("quiz",)


class Question(models.Model):
    question = models.CharField(max_length=200)
    question_quiz = models.ForeignKey('Quiz', on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"
        ordering = ("question",)


class Answer(models.Model):
    value = models.CharField(max_length=50)
    question = models.ForeignKey('Question', on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Ответ"
        verbose_name_plural = "Ответы"


class Message(models.Model):
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"
        ordering = ("created_on",)
