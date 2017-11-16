from django.shortcuts import render
import json
from django.core import serializers
from django.http import HttpResponse
from itertools import chain
from random import shuffle
from .models import Facultie, Course, Question, Option, Suggestion
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def index(request):
    semester = Course.objects.values_list('sem', flat = True)
    semester = list(set(semester))
    branch = Course.objects.values_list('branch', flat = True)
    branch = list(set(branch))
    return render(request, 'frontend/index.html', {'semesters':semester, 'branches':branch})
@csrf_exempt
def lecturers(request):
    semester = request.POST.get('semester')
    branch = request.POST.get('branch')
    faculty = list(Course.objects.filter(sem = semester, branch = branch).values('faculty_id','pk'))
    faculty_ids = []
    for f in faculty:
        faculty_ids.append(f['faculty_id'])
    lecturers = list(Facultie.objects.filter(pk__in = faculty_ids).values('name','image', 'pk'))
    for i in range(0,int(len(lecturers))):
        lecturers[i]['course'] = faculty[i]['pk']
    return HttpResponse(json.dumps(lecturers), content_type='application/json')

# def categories(request):
#     semester = request.POST.get('semester')
#     branch = request.POST.get('branch')
#     faculty_id = request.POST.get('faculty')
#     categories = Question.objects.values_list('category', flat=True)
#     categories = list(set(categories))
#     faculty = Facultie.objects.filter(pk=faculty_id).values_list('name', flat=True)
#     data = {'faculty':faculty[0], 'categories':categories}
#     return HttpResponse(json.dumps(data), content_type='application/json')

# def questions(request):
#     categories = request.POST.getlist('categories[]')
#     questions = []
#     for category in categories:
#         questions.append(Question.objects.filter(category=category).values('question', 'pk'))
#     result_list = list(chain(*allsets(questions)))
#     for question in result_list:
#         question['options'] = list(Option.objects.filter(question=int(question['pk'])).select_related().values('option', 'pk'))
#     return HttpResponse(json.dumps(result_list), content_type='application/json')
@csrf_exempt
def questions(request):
    questions = list(Question.objects.values('question', 'pk'))
    shuffle(questions)
    for question in questions:
        question['options'] = list(Option.objects.filter(question=int(question['pk'])).select_related().values('option', 'pk'))
    return HttpResponse(json.dumps(questions), content_type='application/json')
@csrf_exempt
def suggestion(request):
    options_list = request.POST.getlist('options[]')
    categories = Question.objects.values_list('category', flat=True)
    categories = list(set(categories))
    score = {}
    for category in categories:
        score[category] = 0
    for option in options_list:
        question = list(Option.objects.filter(pk=int(option)).values('question', 'weight'))[0]
        category = list(Question.objects.filter(pk=int(question['question'])).values('category'))[0]
        score[category['category']] = score[category['category']] + int(question['weight'])
    array_score = [['Category', 'Weightage']]
    for s in score.keys():
        array_score.append([s, score[s]])
        data = {'json': score, 'array':array_score}
    return HttpResponse(json.dumps(data), content_type='application/json')
@csrf_exempt
def submit(request):
    semester = request.POST.get('semester')
    branch = request.POST.get('branch')
    faculty = request.POST.get('faculty')
    suggestion = request.POST.get('suggestion')
    course = request.POST.get('course')
    data = json.loads(suggestion)
    faculty_object = Facultie.objects.get(pk=faculty)
    course_object = Course.objects.get(pk=course)
    for category in data.keys():
        s = Suggestion(sem=semester,branch=branch,course_id=course_object,faculty_id=faculty_object,category=category,score=data[category])
        s.save()
    return HttpResponse(json.dumps('success'), content_type='application/json')

def allsets(data):
    ans = ()
    for d in data:
        ans = ans + (d,)
    return ans