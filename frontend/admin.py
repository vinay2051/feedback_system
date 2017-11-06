from django.contrib import admin
from .models import Course, Facultie, Student, Question, Suggestion, FeedBack, Option

# Register your models here.

admin.site.register(Course)
admin.site.register(Facultie)
admin.site.register(Student)
admin.site.register(Question)
admin.site.register(Suggestion)
admin.site.register(FeedBack)
admin.site.register(Option)
