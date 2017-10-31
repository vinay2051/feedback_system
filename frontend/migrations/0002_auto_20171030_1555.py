# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-30 15:55
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.Category', verbose_name='the related category')),
            ],
        ),
        migrations.CreateModel(
            name='Suggestion',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=30)),
                ('course_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.Course', verbose_name='the related course')),
                ('faculty_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.Faculty', verbose_name='the related faculty')),
            ],
        ),
        migrations.AddField(
            model_name='answer',
            name='question_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.Question', verbose_name='the related question'),
        ),
    ]