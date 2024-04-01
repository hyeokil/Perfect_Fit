from django.urls import path
from . import views

app_name = 'voiceData'

# api/v1/{user_id}/record

urlpatterns = [
    path('<int:user_id>/record/', views.record),  # 유저가 샘플 오디오 파일 녹음
    # path('<int:userSeq>/similarlist/<int:cnt>/', views.recommend),  # 자신의 목소리와 비슷한 유저 목록 돌려주기 ]
]