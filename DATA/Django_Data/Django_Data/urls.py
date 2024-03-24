<<<<<<< HEAD
"""Django_Data URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
=======
"""
URL configuration for Django_Data project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
>>>>>>> 75e364b878e58d351f3ac3a7cc305b36d6509cdb
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
<<<<<<< HEAD
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
=======
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/v1/my-page', include('voiceData.urls')),  # voiceData 앱의 URL 포함
>>>>>>> 75e364b878e58d351f3ac3a7cc305b36d6509cdb
]
