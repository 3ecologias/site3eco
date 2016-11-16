from django.conf.urls import include, url
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib.staticfiles.urls import settings
from . import views

urlpatterns = [
    url(r'^$', views.fullsite),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^sucess/', views.contact_sucess),
    url(r'^ajax/more/$', views.load_more),
    url(r'^ajax/more-posts/$', views.load_more_posts),		
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)