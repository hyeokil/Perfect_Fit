import time
import pymysql
import pymysql.cursors
from pytube import Search, YouTube
from youtubesearchpython import VideosSearch

conn = pymysql.connect(host='127.0.0.1', port=3306, user='ssafy', password='ssafy', database='perfectfit',
                                 charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)

try:
    with conn.cursor() as cursor:
        # sql = "select * from song where artist_id = 371 order by song_length desc limit 20"
        sql = "select * from song s JOIN artist a on s.artist_id = a.id where a.id = 371"  # 기리보이, 68개

        # SQL 쿼리 실행
        cursor.execute(sql)
        result = cursor.fetchall()  # sql 결과 가져오기

        # 가져온 sql문 루프
        for idx, res in enumerate(result, start=1):
            if idx <= 13:
                print(idx)
                continue

            start = time.time()

            artist = res['name'].strip()
            title = res['song_title'].strip()
            song_url = res['song_url']
            song_origin_url = "www.youtube.com/watch?v=" + res['song_video_id']
            print(song_url)
            print(song_origin_url)

            mrYT = YouTube(song_url)  # MR용 URL
            originYT = YouTube(song_origin_url)  # 원본용 URL
            print(mrYT)
            print(originYT)

            # 1. 일반 다운로드 - 가능한 최고 해상도
            originStreams = originYT.streams.get_highest_resolution()  # 다운로드 가능한 최고 해상도

            # 2. 오디오만 추출 다운로드
            # audioStreams = originYT.streams.get_audio_only()  # 영상에서 오디오만 추출하여 다운로드.

            # 3. 필터를 적용한 오디오 추출 - 오디오 타입 + opus 코덱 + 음질(abr)이 가장 높은 것 / subtype 인자 = mime_type
            filterStreams = originYT.streams.filter(type='audio', only_audio=True, audio_codec='opus').order_by('abr').desc().first()

            # 4. MR 다운로드(영상, 소리)
            mrStreams = mrYT.streams.get_highest_resolution()

            # 용도에 맞는 파일명 설정
            originName = f'[Origin] {artist} - {title} .wav'
            # audioStremas = f'[Audio] {artist} - {title}.wav'
            # filterName = f'[Aduio] {artist} - {title}.wav'
            mrName = f'[MR] {artist} - {title}.wav'

            # 용도에 맞는 다운로드 경로
            originStreams.download(filename=originName, output_path='../downloads/Origin')
            mrStreams.download(filename=mrName, output_path='../downloads/MR')
            end = time.time()
            print(f"{idx}번 째 다운로드 경과 시간 -> {round(end - start, 2)}초")
            print("--------------------------------------")

    # conn.commit()

    print(f'-- All Task Done --')

finally:
    conn.close()

###########################################
'''
[ 예외 케이스 ]
1. FileNotFoundError: [Errno 2] No such file or directory: 'C:\\Users\\SSAFY\\Desktop\\repos\\song\\S10P22C205\\MUSIC\\ytSongs\\ytDownload\\../downloads/Origin\\[Origin] 기리보이 - 2000/90 .wav'
- 파일명으로 들어가는데, "/"를 사용할 수 없음.
"\ / : * ? " < > |"

59개 = 2.41Gb -> 2.37Gb

'''