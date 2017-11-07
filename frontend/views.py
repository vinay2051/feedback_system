from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'frontend/lecturers.html', {'semesters':range(1,9), 'branches':get_branch()})

def get_branch():
    return [{'id':1, 'branch':'CSC'}, {'id':2, 'branch':'CSE'}, {'id':2, 'branch':'MEC'}, {'id':4, 'branch':'CIV'}, {'id':5, 'branch':'ECE'}]