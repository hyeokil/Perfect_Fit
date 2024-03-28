import scrapetube
import time
# from datetime import time
import pymysql
import pymysql.cursors
import re

## 채널 ##
# ch = scrapetube.get_channel("UCZUhx8ClCv6paFW7qi3qljg", limit=50, content_type="videos")  # TJ
ch = scrapetube.get_channel("UCZUhx8ClCv6paFW7qi3qljg", content_type="shorts")  # TJ -> 총 275개

# pattern = re.compile(r'\[노래방레전드\] (?P<artist>.+?)의 (?P<title>.+?)\(.*\) COVER / TJ노래방')

pattern = r'.*의\s(.+)\(([^)]+)\)\sCOVER.*'

cnt = 0
for c in ch:
    videoURL = "www.youtube.com"
    videoID = c['videoId']
    videoURL += c['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url']
    thumbnail = c['thumbnail']['thumbnails'][0]['url']
    temp = c['headline']['simpleText']
    # print(temp)
    # match = pattern.search(temp)

    # if match:
    #     # title = match.group(0)  # 첫 번째 괄호에 해당하는 부분(제목)
    #     # artist = match.group(1)  # 두 번째 괄호에 해당하는 부분(가수)
    #     print(f"노래 제목: {match.group('title')}, 가수: {match.group('artist')}")
    #
    # else:
    #     continue

    match = re.match(pattern, temp)
    if match:
        title = match.group(1)
        artist = match.group(2)
        cnt += 1
        # print(f'제목: {song_title} 가수: {artist}')
    else:
        continue
        # print("일치하는 정보가 없습니다.")


    views = c['viewCountText']['simpleText']
    v_match = re.search(r'(\d+(\.\d+?))(K)?', views)

    if v_match:
        number = float(v_match.group(1))
        if v_match.group(3)  == 'K':
            number *= 1000
            number = int(number)

    print(videoID)  # 영상 ID
    print(videoURL)  # 실제 영상 URL
    print(thumbnail)  # 168 * 94
    print(title)  # 영상 제목(str)
    print(artist)  # 가수
    print(number)  # 영상 조회수(str)

    # print(c['videoId'])  # 영상 ID
    # print(c['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url'])  # 실제 영상 URL
    # print(c['thumbnail']['thumbnails'][0])  # 168 * 94
    # print(c['title']['runs'][0]['text'])  # 영상 제목(노래 제목 + 가수)
    # print(c['lengthText']['simpleText'])  # 영상 길이
    # print(c['viewCountText']['simpleText'])  # 조회수
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

print(f'끝 -> {cnt}')