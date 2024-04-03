from django.urls import path
from . import views

app_name = 'voiceData'

urlpatterns = [
    path('<int:userId>/record/', views.record),  # 사용자가 샘플 오디오 파일 녹음
    path('<int:userId>/recordView/', views.record_view),  # 특정 사용자 샘플 오디오 파일 조회
    path('<int:userId>/userRecommend/', views.user_recommend),  # 자신의 목소리와 비슷한 사용자 목록 조회
    path('chartData/', views.chart_data),  # chart에 사용될 데이터셋
    path('<int:userId>/autoPitch/', views.sing_auto_pitch),  # 음정 자동 조절에 사용될 데이터
    path('<int:userId>/isVoice/', views.isSoundFeature),  # 특정 사용자가 샘플 음성 데이터가 있는지 조회
]