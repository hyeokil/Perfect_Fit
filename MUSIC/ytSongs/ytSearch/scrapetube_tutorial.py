import scrapetube
import time
from datetime import time
import pymysql
import pymysql.cursors
import re


## 채널 ##
ch = scrapetube.get_channel("UCZUhx8ClCv6paFW7qi3qljg", limit=50, content_type="videos")  # TJ

# cnt = 0
# start = time.time()
# temp = list(ch)
# print(len(temp))  # 64058
# end = time.time()
# print(f"끝 -> {end-start}")  # 2634.8815319538116

pattern = re.compile(r"\[TJ노래방( / 남자키| / 여자키)?\] (.+) - (.+) / TJ Karaoke")


for c in ch:
    videoURL = "www.youtube.com"
    # title = ""
    # artist = ""
    # videoLen = ""
    # views = ""
    videoID = c['videoId']
    videoURL += c['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url']
    thumbnail = c['thumbnail']['thumbnails'][0]['url']
    # print(c['title']['runs'][0]['text'])
    # temp = c['title']['runs'][0]['text'].split(" - ")  # list
    temp = c['title']['runs'][0]['text']
    match = pattern.search(temp)

    if match:
        title = match.group(2)  # 첫 번째 괄호에 해당하는 부분(제목)
        artist = match.group(3)  # 두 번째 괄호에 해당하는 부분(가수)
    else:
        continue

    videoLen = c['lengthText']['simpleText']

    minutes, seconds = map(int, videoLen.split(':'))
    time_str = "{minutes:02}:{seconds:02}".format(minutes=minutes, seconds=seconds)  # str

    videoLen = time_str
    views = c['viewCountText']['simpleText'].split(" v")[0]
    views = int(views.replace(",", ""))

    print(videoID)  # 영상 ID
    print(videoURL)  # 실제 영상 URL
    print(thumbnail)  # 168 * 94
    print(title)  # 영상 제목(str)
    print(artist)  # 가수
    print(videoLen)  # 영상 길이(str)
    print(views)  # 영상 조회수(str)

    print()

    # connection = pymysql.connect(host='127.0.0.1', port=3306, user='ssafy', password='ssafy', database='perfectfit',
    #                              charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    #
    # try:
    #     with connection.cursor() as cursor:
    #         sql = """INSERT INTO song (song_url, song_title, song_artist, song_thumbnail, song_views, song_length) VALUES (%s, %s, %s, %s, %s, %s)"""
    #
    #
    #         # SQL 쿼리 실행
    #         cursor.execute(sql, (videoURL, title, artist, thumbnail, views, videoLen))
    #
    #     connection.commit()
    #
    # finally:
    #     connection.close()

#######################################################

## Playlist ##
pl = scrapetube.get_playlist("PL5rkMpxC5Ex-0HnOcGZMBwk-8sl8SqLjB")  # 재생목록 ID
# for p in pl:
    # print(p['videoId'])  # 영상 ID
    # print(p['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url'])  # 실제 영상 URL
    # print(p['thumbnail']['thumbnails'][0])  # 168 * 94
    # print(p['title']['runs'])  # 영상 제목
    # print(p['lengthText']['simpleText'])  # 영상 길이
    # print(p['videoInfo']['runs'][0]["text"])  # 조회수
    # print()

## 일반 검색 ##
sc = scrapetube.get_search("우원재 시차", limit=5)
# print(sc)
# for s in sc:
#     print(s)
    # print(s['videoId'])

# print(type(videos))  # 제너레이터
# print(next(videos))  # 다음 객체 보기
