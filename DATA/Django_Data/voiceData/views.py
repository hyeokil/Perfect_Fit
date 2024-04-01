from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from .serializers import SoundFeatureSerializer
from .models import SoundFeature
from rest_framework import status
import librosa
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import sklearn
import os
import urllib.request
import logging
# import matplotlib.pyplot as plt
import numpy as np

# 파일 업로드
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

logging.getLogger('matplotlib').setLevel(logging.WARNING)
logger = logging.getLogger('voiceData')


@api_view(['POST', 'PUT'])
# def record(request):  # Local Teest
def record(request, user_id):
    if 'file' not in request.FILES:
        return Response({'error': 'No file Exception'}, status=status.HTTP_400_BAD_REQUEST)

    logger.info(f'@@@@@@@@@ {request.data}')
    file = request.FILES['file']  # 파일 가져오기
    # 서버에 임시 저장
    file_name = default_storage.save(file.name, ContentFile(file.read()))
    file_path = default_storage.path(file_name)

    logger.info(f'File Type : {type(file)}')  # <class 'django.core.files.uploadedfile.InMemoryUploadedFile'>
    logger.info(file.name)  # voiceData:F_000001.wav

    # 분석 데이터 보관
    data = {}
    data['user_pk'] = user_id

    # 오디오 파일 가져오기 -> 파일로 받기.
    # song_sample = "./samples/SINGER_46_10TO29_NORMAL_FEMALE_BALLAD_C1925.wav"
    # y, sr = librosa.load(song_sample)

    y, sr = librosa.load(file_path)
    logger.info("========== 음성 데이터 로드 완료 ==========")
    # print("========== 음성 데이터 로드 완료 ==========")

    # 템포, 비트 -> BPM
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    data['tempo'] = tempo
    # data['beats'] = beats  # 비트를 어디에 사용할까..?

    # 음파가 양에서 음으로 / 음에서 양으로 바뀌는 비율
    zero_crossings = librosa.zero_crossings(y, pad=False)
    data['zero_crossing_rate_mean'] = zero_crossings.mean()
    data['zero_crossing_rate_var'] = zero_crossings.var()
    logger.info(f"zero_crossings(음-양 이동 횟수) : {sum(zero_crossings)}")
    # print(sum(zero_crossings))  # 음 <-> 양 이동한 횟수

    # Harmonics: 사람의 귀로 구분할 수 없는 특징들(음악의 색깔)
    # Percussives: 리듬과 감정을 나타내는 충격파
    y_harm, y_perc = librosa.effects.hpss(y)
    data['harmony_mean'], data['harmony_var'] = y_harm.mean(), y_harm.var()
    data['perceptr_mean'], data['perceptr_var'] = y_perc.mean(), y_perc.var()

    # 소리를 주파수 표현했을 때, 주파수의 가중평균을 계산하여 소리의 "무게 중심"이 어딘지를 알려주는 지표
    # 예를 들어, 블루스 음악은 무게 중심이 가운데 부분에 놓여있는 반면, 메탈 음악은 (끝 부분에서 달리기 때문에) 노래의 마지막 부분에 무게 중심이 실린다
    spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
    data['spectral_centroid_mean'], data['spectral_centroid_var'] = spectral_centroids.mean(), spectral_centroids.var()

    # 신호 모양을 측정한다.
    # 총 스펙트럴 에너지 중 낮은 주파수(85% 이하)에 얼마나 많이 집중되어 있는가
    spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
    data['rolloff_mean'], data['rolloff_var'] = spectral_rolloff.mean(), spectral_rolloff.var()

    # Mel - Frequency Cepstral Coefficients(MFCCs)
    # mfccs = librosa.feature.mfcc(y, sr=sr)
    # mfccs = normalize(mfccs, axis=1)

    # Chroma Frequencies
    # 음악의 흥미롭고 강렬한 표현
    # 인간 청각이 옥타브 차이가 나는 주파수를 가진 두 음을 유사음으로 인지한다는 음악이론에 기반.
    # 모든 스펙트럼을 12개의 Bin으로 표현.
    # 12개의 Bin은 옥타브에서 12개의 각기 다른 반응(Semitones(반음) = Chroma)을 의미. -> 보통 반대 성별의 키값을 맞출 때 12옥타브 만큼 차이 냄.
    chromagram = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=512)
    data['chroma_stft_mean'], data['chroma_stft_var'] = chromagram.mean(), chromagram.var()
    # librosa.display.specshow(chromagram, y_axis='chroma', x_axis='time')
    # plt.colorbar()
    # plt.show()

    # p'차 스펙트럼 대역폭을 계산
    spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)
    data['spectral_bandwidth_mean'], data['spectral_bandwidth_var'] = spectral_bandwidth.mean(), spectral_bandwidth.var()

    # 사람의 청각 구조를 반영하여 음성 정보 추출
    mfccs = librosa.feature.mfcc(y=y, sr=sr)  # n_mfcc 매개변수의 값을 따라 지정하지 않을 경우, 기본값 = 20
    # mfccs = normalize(mfccs, axis=1)
    logger.info(f"mfccs의 길이 : {len(mfccs)}")
    logger.info("logger.info")

    for i in range(len(mfccs)):
        data['mfcc' + str(i) + '_mean'], data['mfcc' + str(i) + '_var'] = mfccs[i].mean(), mfccs[i].var()


    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitches = pitches[magnitudes > np.median(magnitudes)]
    logger.info(f'모든 Pitches -> {pitches}')
    min_pitch, max_pitch = min(pitches), max(pitches)
    avg_pitch = np.mean(pitches[pitches > 0])
    logger.info(f'최소 Pitch : {min(pitches)} / 최대 Pitch : {max(pitches)}')
    logger.info(f'Pitch의 길이 : {len(pitches)} / 평균 Pitch : {avg_pitch}')
    result = librosa.hz_to_midi([min_pitch, max_pitch])
    result = librosa.midi_to_note(result)
    # result = librosa.hz_to_note([minPitch, maxPitch])

    data['min_pitch'], data['max_pitch'] = min_pitch, max_pitch
    data['min_note'], data['max_note'] = str(result[0]), str(result[1])
    data['avg_pitch'] = float(avg_pitch)
    logger.info(type(result[0]), type(result[1]))  # <class 'numpy.str_'>

    logger.info(f'최소 피치 = {round(min_pitch)} / 최대 피치 = {round(max_pitch)}')
    logger.info(f'최소 음계 = {result[0]} / 최대 음계 = {result[1]}')
    logger.info(f'avg_pitch -> {data["avg_pitch"]}')

    # if SoundFeature.objects.filter(user_pk = user_id).exists():
    #     sound = SoundFeature.objects.get(user_pk = user_id)
    #     serializer = SoundFeatureSerializer(sound, data = data)

    serializer = SoundFeatureSerializer(data=data)
    logger.info(f"현재까지 저장된 data -> {data}")

    # raise_exception = True
    # 데이터가 유효하지 않을 경우 자동으로 'ValidationError' 예외 발생
    # 클라이언트에게 400 Bad Request 반환.
    try:
        # 유효성 검사 후 데이터 저장
        if serializer.is_valid():
            serializer.save()
            logger.info("Serializer Success !")
            default_storage.delete(file_name)  # 서버에서 사용이 끝난 파일을 삭제
            return Response({'data': data}, status=status.HTTP_200_OK)  # json
        else:
            logger.info("Serializer validation failed")
            logger.info(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except serializers.ValidationError as e:
        logger.error("ValidationError caught")
        logger.error(e.detail)
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def record_view(request, user_id):
    sound_features = SoundFeature.objects.filter(user_pk=user_id)
    serializer = SoundFeatureSerializer(sound_features, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_recommend(request, user_id, cnt):
    sound_features = SoundFeature.objects.all()







'''
[ 마페 ]
1. 남/여 평균 주파수대 + 사용자 주파수대 = 막대 그래프
2. 옥타브 범위 그래프 = chart.js
3. ++?

requirements.txt 갱신
'''