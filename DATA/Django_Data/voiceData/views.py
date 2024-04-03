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
import logging
# import matplotlib.pyplot as plt
import numpy as np
import os
import json
from django.conf import settings
from django.http import JsonResponse
import wave
from django.core.files.uploadedfile import TemporaryUploadedFile
import urllib.request

# 파일 업로드
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import subprocess

logging.getLogger('matplotlib').setLevel(logging.WARNING)
logging.getLogger('numba').setLevel(logging.WARNING)
logger = logging.getLogger('voiceData')
# warnings.simplefilter('ignore', category=NumbaWarning)


@api_view(['POST', 'PUT'])
# def record(request):  # Local Test
def record(request, userId):
#     if 'file' not in request.FILES:
#         return Response({'error': 'No file Exception'}, status=status.HTTP_400_BAD_REQUEST)
#
#     logger.info(f'@@@@@@@@@ {request.data}')
#     file = request.FILES['file']  # 파일 가져오기
#     # 서버에 임시 저장
#     # file_name = default_storage.save(file.name, ContentFile(file.read()))
#     # file_path = default_storage.path(file_name)
#
#     ###  ffmpeg TEST  ###
#     converted_file_path = handle_uploaded_file(file)
#     logger.info(f'converted file path: {converted_file_path}')
#
#     # if isinstance(file, TemporaryUploadedFile):
#     #     test_file_path = file.temporary_file_path()
#
#     logger.info(f'File Type : {type(file)}')  # <class 'django.core.files.uploadedfile.InMemoryUploadedFile'>
#     logger.info(f'File Name : {file.name}')  # voiceData:F_000001.wav
#     # logger.info(f'File Path : {file_path}')
#     # logger.info(f'Test File Path : {test_file_path}')
#     # C:\Users\SSAFY\Desktop\repos\AI\S10P22C205\DATA\Django_Data\media\audio-basics_outfoxing.mp3
#
#     '''
#     INFO:voiceData:@@@@@@@@@ <QueryDict: {'userId': ['22'], 'file': [<InMemoryUplo
# adedFile: audio-basics_outfoxing.mp3 (audio/mpeg)>]}>
# INFO:voiceData:File Type : <class 'django.core.files.uploadedfile.InMemoryUplo
# adedFile'>
#
#     '''

    # 분석 데이터 보관
    data = {}
    data['user_pk'] = userId

    # s3
    song_path = request.data.get('url')
    # song_path = "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/voicerecord/%EC%95%A0%EA%B5%AD%EA%B0%801%EC%A0%88.wav"
    # song_path = "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/voicerecord/2024-04-03T10-25-32.098Z.wav"
    logger.info(f'song_path: {request.data.get("url")}')

    if not song_path:
        logger.info(f'Song_Path 없음 : {song_path}')
        return Response("s3 URL Not Found")

    # 오디오 파일 가져오기 -> s3
    save_name = 'media/music_test.wav'
    urllib.request.urlretrieve(song_path, save_name)

    # 오디오 파일 가져오기 -> 파일로 받기.
    # song_sample = "./samples/SINGER_46_10TO29_NORMAL_FEMALE_BALLAD_C1925.wav"
    # y, sr = librosa.load(song_sample)

    # y, sr = librosa.load(file_path)
    # y, sr = librosa.load(test_file_path)
    # y, sr = librosa.load(converted_file_path)
    y, sr = librosa.load(save_name)
    logger.info("========== 음성 데이터 로드 완료 ==========")

    # 템포, 비트 -> BPM
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
    data['tempo'] = tempo
    # data['beats'] = beats  # 비트를 어디에 사용할까..?

    # 음파가 양에서 음으로 / 음에서 양으로 바뀌는 비율
    zero_crossings = librosa.zero_crossings(y, pad=False)
    data['zero_crossing_rate_mean'] = zero_crossings.mean()
    data['zero_crossing_rate_var'] = zero_crossings.var()
    logger.info(f"zero_crossings(음-양 이동 횟수) : {sum(zero_crossings)}")

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
    logger.info(f'Type 확인 : {type(result[0])}, {type(result[1])}')

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
            # default_storage.delete(file_name)  # 서버에서 사용이 끝난 파일을 삭제
            # os.remove(save_name)  # 서버에서 사용이 끝난 파일을 삭제 -> s3
            # return Response({'data': data}, status=status.HTTP_200_OK)  # json
            return Response({'message': "음성 데이터 저장 완료."}, status=status.HTTP_200_OK)
        else:
            logger.info("Serializer validation failed")
            logger.info(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except serializers.ValidationError as e:
        logger.error("ValidationError caught")
        logger.error(e.detail)
        return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)


# 특정 유저의 목소리 샘플 데이터 조회
@api_view(['GET'])
def record_view(request, userId):
    sound_features = SoundFeature.objects.filter(user_pk=userId)
    serializer = SoundFeatureSerializer(sound_features, many=True)
    return Response(serializer.data)


# 특정 유저와 목소리 유사도가 비슷한 다른 유저를 3명까지 추천하여 반환.
@api_view(['GET'])
def user_recommend(request, userId):
    logger.info(f'request 확인(user_recommend) : {userId}')

    sound = SoundFeature.objects.all()
    df = pd.DataFrame(list(sound.values()))

    idx = df[['user_pk']]
    logger.info(f'idx : {idx}')  # 등록된 모든 User id / user_id 반환
    df = df.drop(columns=['id', 'user_pk', 'min_note', 'max_note'])
    scaled = sklearn.preprocessing.scale(df)
    df = pd.DataFrame(scaled, columns=df.columns)

    # 코사인 유사도
    similar = cosine_similarity(df)
    similar_df = pd.DataFrame(similar, index=idx['user_pk'], columns=idx['user_pk'])

    # 상위부터 cnt 명 수 만큼 찾기 / asce = 역순
    logger.info(similar_df.loc[userId].sort_values(ascending=False))
    cur_user = similar_df.loc[userId].sort_values(ascending=False)[1:4]
    logger.info(f'cur_user: {cur_user}')

    res_user = cur_user[cur_user >= 0.5]
    logger.info(f'res_user: {type(res_user.index.tolist())}')  # list

    # 1. 딕셔너리로 반환
    # result = {
    #     'data': res_user.index
    # }

    # 2. list로 반환
    result = res_user.index.tolist()  # list

    logger.info(f'result -> {result}')

    return Response(result)


# 차트 분석에 쓰일 데이터 반환
@api_view(['GET'])
def chart_data(request):
    # 프로젝트 루트 경로를 기반으로 파일 경로 설정
    octave_data = os.path.join(settings.BASE_DIR, 'data_preprocess', 'octave_data.json')
    artist_data = os.path.join(settings.BASE_DIR, 'data_preprocess', 'artist_data.json')

    # 파일 1 읽기
    with open(octave_data, 'r', encoding='utf-8') as file:
        octave_json = json.load(file)

    # 파일 2 읽기
    with open(artist_data, 'r', encoding='utf-8') as file:
        artist_json = json.load(file)

    # 두 파일의 데이터를 합쳐서 하나의 응답으로 반환
    chart_dataset = {
        'octaveData': octave_json,
        'artistData': artist_json
    }

    return JsonResponse(chart_dataset)

# 음정 자동 조절 계산용 데이터 반환
@api_view(["GET"])
def sing_auto_pitch(request, userId):
    octave_data = os.path.join(settings.BASE_DIR, 'data_preprocess', 'octave_data.json')
    # auto_pitch_data = os.path.join(settings.BASE_DIR, 'data_preprocess', 'auto_pitches.json')
    with open("data_preprocess/auto_pitches.json", 'r', encoding='utf-8') as file:
        auto_pitch_data = json.load(file)

    try:
        sound_features = SoundFeature.objects.get(user_pk=userId)
        avg_pitch = int(sound_features.avg_pitch)

        # note로 변환 및 유니코드 문자 존재시 치환.
        avg_note = librosa.hz_to_note(avg_pitch).replace("♯", "#")
        note_key, note_value = avg_note[:-1], int(avg_note[-1])
        # avg_note = auto_pitch_data['avg_note']
        logger.info(f'test : {type(note_key)} {note_key} | {type(note_value)} {note_value}')
        avg_note = auto_pitch_data["D#"][note_value]

        # INFO:voiceData:avg_pitch: 1260 / avg_note: D#6
        logger.info(f'avg_pitch: {avg_pitch} / avg_note: {avg_note}')

        msg = "유저의 평균 Pitch 반환 완료."

        result = {
            # 'avg_pitch': avg_pitch,
            'avg_note': avg_note,
            'msg': msg,
        }

    except SoundFeature.DoesNotExist as e:
        avg_pitch = 0
        msg = "유저의 데이터를 찾을 수 없음."
        result = {
            'avg_pitch': avg_pitch,
            'msg': msg,
        }

    return Response(result)

# 유저가 목소리 샘플 분석용 데이터가 존재하는지 조회.
@api_view(['GET'])
def isSoundFeature(request, userId):
    logger.info(f'request 확인(isSoundFeature) : {userId}')
    sound_features = SoundFeature.objects.filter(user_pk=userId)
    is_sf = True

    if sound_features.exists():
        return Response(is_sf)
    else:
        is_sf = False
        return Response(is_sf)
