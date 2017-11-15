from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^lecturers/$', views.lecturers, name='lecturers'),
    # url(r'^categories/$', views.categories, name='categories'),
    url(r'^questions/$', views.questions, name='questions'),
    url(r'^suggestion/$', views.suggestion, name='suggestion'),
    url(r'^submit/$', views.submit, name='submit'),
]