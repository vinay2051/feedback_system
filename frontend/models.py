from django.db import models

# Create your models here.

class Facultie(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    email = models.CharField(max_length=300)
    password = models.CharField(max_length=30)
    image = models.ImageField(upload_to = 'static/assets/', default = 'static/assets/no-img.png')
    def __str__(self):
        return self.name

class Course(models.Model):
    _id = models.AutoField(primary_key=True)
    course_code = models.CharField(max_length=30)
    sem = models.CharField(max_length=30)
    faculty_id = models.ForeignKey(Facultie, on_delete=models.CASCADE, verbose_name="the related faculty")
    branch = models.CharField(max_length=30)
    def __str__(self):
        return self.course_code

class Student(models.Model):
    _id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    sem = models.CharField(max_length=30)
    branch = models.CharField(max_length=30)
    email = models.CharField(max_length=300)
    password = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class Question(models.Model):
    _id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=300)
    category = models.CharField(max_length=300)
    def __str__(self):
        return self.question

class Option(models.Model):
    _id = models.AutoField(primary_key=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name="the related question")
    option = models.CharField(max_length=300)
    weight = models.IntegerField()
    def __str__(self):
        return self.option

class Suggestion(models.Model):
    _id = models.AutoField(primary_key=True)
    sem = models.CharField(max_length=30)
    branch = models.CharField(max_length=30)
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name="the related course")
    faculty_id = models.ForeignKey(Facultie, on_delete=models.CASCADE, verbose_name="the related faculty")
    category = models.CharField(max_length=30)
    score = models.BigIntegerField()
    def __str__(self):
        return "suggestion"

class FeedBack(models.Model):
    _id = _id = models.AutoField(primary_key=True)
    question_id = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name="the related question")
    grade = models.BigIntegerField()
    session_id = models.CharField(max_length=30)
    ip = models.CharField(max_length=30)
    faculty_id = models.ForeignKey(Facultie, on_delete=models.CASCADE, verbose_name="the related faculty")
    course_id = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name="the related course")
    branch = models.CharField(max_length=30)
    def __str__(self):
        return self.ip
