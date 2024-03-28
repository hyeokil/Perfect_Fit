import scrapetube
import time
import pymysql
import pymysql.cursors
import re


## 채널 ## -> 금영으로 변경(채널 ID, 정규 표현식)
# ch = scrapetube.get_channel("UCZUhx8ClCv6paFW7qi3qljg", limit=50, content_type="videos")  # TJ
ch = scrapetube.get_channel("UCDqaUIUSJP5EVMEI178Zfag", sleep=0, content_type="videos")  # KY


# cnt = 0
# start = time.time()
# temp = list(ch)
# print(len(temp))  # 64058
# end = time.time()
# print(f"끝 -> {end-start}")  # 2634.8815319538116

# pattern = re.compile(r"\[TJ노래방( / 남자키| / 여자키)?\] (.+) - (.+) / TJ Karaoke")
pattern = re.compile(r"(.+) - (.+) \(")  # 기존


findCnt = 0
start = time.time()

for c in ch:
    videoURL = "www.youtube.com"
    videoID = c['videoId']
    videoURL += c['navigationEndpoint']['commandMetadata']['webCommandMetadata']['url']
    thumbnail = c['thumbnail']['thumbnails'][0]['url']
    temp = c['title']['runs'][0]['text']

    # print(temp)  ########
    match = pattern.search(temp)  # 기존
    findCnt += 1

    # 기존
    if match:
        title = match.group(1)  # 첫 번째 괄호에 해당하는 부분(제목)
        artist = match.group(2)  # 두 번째 괄호에 해당하는 부분(가수)
    else:
        continue


    videoLen = c['lengthText']['simpleText']

    # minutes, seconds = map(int, videoLen.split(':'))
    # time_str = "{minutes:02}:{seconds:02}".format(minutes=minutes, seconds=seconds)  # str
    # videoLen = time_str

    # views = c['viewCountText']['simpleText'].split(" v")[0]
    # views = int(views.replace(",", ""))

    print(videoID)  # MR 영상 ID
    print(videoURL)  # 실제 영상 URL
    print(title)  # 영상 제목(str)
    # print(artist)  # 가수
    # print(videoLen)  # 영상 길이(str)

    # print()

    q = artist + " " + title  # 받아온 데이터로 다시 "가수 제목"영상을 Youtube에서 검색
    sc = scrapetube.get_search(q, limit=1, sleep=0, results_type="video")

    origin_views = 0
    song_video_url = ""
    for s in sc:
        song_video_url = s['videoId']
        origin_views = s['viewCountText']['simpleText'].replace(",", "").split(" ")[0]
        # print(origin_views)

        # 조회수가 1자리수면 "No views"이 출력됨.
        if origin_views.isdigit():
            origin_views = int(origin_views)
        else:  # 조회수가 1자리면, 10으로 고정.
            origin_views = 10
        # print(origin_views)

    song_origin_url = "https://www.youtube.com/watch?v="
    song_origin_url += song_video_url
    # print(f'비디오ID = {song_video_url}, 오리진URL = {song_origin_url}')
    # print()

    print(f"id = {findCnt}")

    # connection = pymysql.connect(host='127.0.0.1', port=3306, user='ssafy', password='ssafy', database='perfectfit',
    #                              charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    #
    # try:
    #     with connection.cursor() as cursor:
    #         sql = """INSERT INTO song (song_url, song_title, song_artist, song_length, song_video_id, song_origin_url, song_view) VALUES (%s, %s, %s, %s, %s, %s, %s)"""
    #
    #
    #         # SQL 쿼리 실행
    #         cursor.execute(sql, (videoURL, title, artist, videoLen, song_video_url, song_origin_url, origin_views))
    #
    #     connection.commit()
    #
    # finally:
    #     connection.close()

end = time.time()
print("###############################################################")
print(f'총 탐색 개수 = {findCnt}개 / 걸린 시간 = {int(end - start)}초')
#######################################################