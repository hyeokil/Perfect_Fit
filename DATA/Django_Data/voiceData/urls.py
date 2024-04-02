from django.urls import path
from . import views

app_name = 'voiceData'

urlpatterns = [
    path('<int:user_id>/record/', views.record),  # 유저가 샘플 오디오 파일 녹음
    path('<int:user_id>/record_view/', views.record_view),  # 특정 유저 샘플 오디오 파일 조회
    path('<int:user_id>/user_recommend/', views.user_recommend),  # 자신의 목소리와 비슷한 유저 목록 조회
]