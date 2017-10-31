from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'frontend/lecturers.html', {'questions':[{'question':'what?','id':1},{'question':'why?','id':2},{'question':'how?','id':3}]})

def home(request):
    return render(request, 'frontend/home.html', {'questions':[{'question':'Is he/she punctual?','id':1},{'question':'Is he/she audible?','id':2},{'question':'Can you understand his/her accent?','id':3}]})
