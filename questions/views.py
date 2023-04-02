from django.shortcuts import render
from .models import Question, Message, Quiz
from .forms import EmailForm
from django.http import HttpResponseRedirect


def questions_index(request):
    quiz_all = Quiz.objects.all()
    context = {"quiz_all": quiz_all}
    return render(request, "questions_index.html", context)


def questions_detail(request, id):
    quest_quiz = Question.objects.get(id=id)
    context = {'quest_quiz': quest_quiz}
    return render(request, "questions_detail.html", context)


def contacts(request):
    form = EmailForm()
    if request.method == 'POST':
        form = EmailForm(request.POST)
        if form.is_valid():
            my_message = Message(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                message=form.cleaned_data['message'],
            )
            my_message.save()
            return HttpResponseRedirect('/contacts')
    messages = Message.objects.all()
    context = {
        'messages': messages,
        'form': form}
    return render(request, "contacts.html", context)
