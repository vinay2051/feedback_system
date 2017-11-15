from django.shortcuts import render
import json
from django.core import serializers
from django.http import HttpResponse
from frontend.models import Suggestion, Facultie, Course

# Create your views here.

def index(request):
    return render(request, 'faculty/index.html')

def review(request):
    datas = list(Suggestion.objects.values('category', 'score'))
    score = [['Category', 'Weightage']]
    categories = list(set(Suggestion.objects.values_list('category', flat=True)))
    for category in categories:
        sum = 0
        count = 0
        for data in datas:
            if category == data['category']:
                sum = sum + int(data['score'])
                count = count + 1
        total  = (sum / count)
        score.append([category, total])
    return HttpResponse(json.dumps(score), content_type='application/json')