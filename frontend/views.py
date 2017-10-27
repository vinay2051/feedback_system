from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'frontend/home.html', {'questions':[{'question':'what?','id':1},{'question':'why?','id':2},{'question':'how?','id':3}]})
