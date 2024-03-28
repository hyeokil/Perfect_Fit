# 유튜브 플레이리스트 다운로드
from pytube import Playlist

playlist = 'https://www.youtube.com/playlist?list=PLbSYejIKUpAPfQtO5-xwDilxUenp3SRcd'
DOWNLOAD_DIR = r"downloadSet"

print("fff")
p = Playlist(playlist)

for video in p.videos:
    print(video.streams.first())
    # video.streams.first().download()