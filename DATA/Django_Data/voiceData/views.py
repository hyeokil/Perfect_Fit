from rest_framework.decorators import api_view
from rest_framework.response import Response
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

logging.getLogger('matplotlib').setLevel(logging.WARNING)
logger = logging.getLogger('voiceData')

@api_view(['POST', 'PUT'])
# def record(request, userSeq):
def record(request):
    # 분석 데이터 보관
    data = {}
    # data['user_pk'] = userSeq

    # 오디오 파일 가져오기 -> s3로 변경해야함.
    # "./F_000001.wav"
    song_sample = "./samples/SINGER_46_10TO29_NORMAL_FEMALE_BALLAD_C1925.wav"
    y, sr = librosa.load(song_sample)
    logger.info("========== 음성 데이터 로드 완료 ==========")
    # print("========== 음성 데이터 로드 완료 ==========")

    # 템포, 비트 -> BPM
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    data['tempo'] = tempo
    # data['beats'] = beats

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

    '''
    Mel - Frequency Cepstral Coefficients(MFCCs)
    mfccs = librosa.feature.mfcc(y, sr=sr)
    mfccs = normalize(mfccs, axis=1)
    '''

    # Chroma Frequencies
    # 음악의 흥미롭고 강렬한 표현
    # 인간 청각이 옥타브 차이가 나는 주파수를 가진 두 음을 유사음으로 인지한다는 음악이론에 기반.
    # 모든 스펙트럼을 12개의 Bin으로 표현.
    # 12개의 Bin은 옥타브에서 12개의 각기 다른 반응(Semitones(반음) = Chroma)을 의미.
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
        data['mfcc'+ str(i) + '_mean'], data['mfcc' + str(i) + '_var'] = mfccs[i].mean(),mfccs[i].var()

    logger.info(f"현재까지 저장된 data -> {data}")

    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitches = pitches[magnitudes > np.median(magnitudes)]
    logger.info(f'모든 Pitches -> {pitches}')
    minPitch, maxPitch = min(pitches), max(pitches)
    average_pitch = np.mean(pitches[pitches > 0])
    logger.info(f'최소 Pitch : {min(pitches)} / 최대 Pitch : {max(pitches)}')
    logger.info(f'Pitch의 길이 : {len(pitches)} / 평균 Pitch : {average_pitch}')
    result = librosa.hz_to_midi([minPitch, maxPitch])
    result = librosa.midi_to_note(result)
    # result = librosa.hz_to_note([minPitch, maxPitch])
    print(f'최소 음계 = {result[0]} / 최대 음계 = {result[1]}')  # data dictionary에 컬럼 생성 해야함.

    return Response({'data': data}, status=status.HTTP_200_OK)

