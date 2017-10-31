from django.contrib import admin
from .models import Course, Faculty, Student, Question, Suggestion, FeedBack

# Register your models here.

admin.site.register(Course)
admin.site.register(Faculty)
admin.site.register(Student)
admin.site.register(Question)
admin.site.register(Suggestion)
admin.site.register(FeedBack)