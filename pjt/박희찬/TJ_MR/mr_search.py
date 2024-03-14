from pytube import YouTube
import sys


def progress_func(chunk, file_handle, bytes_remaining):
    print("Progress_func() 시작")
    filesize = chunk.filesize
    current = ((filesize - bytes_remaining)/filesize)
    # percent = ('{0:.1f}').format(current*100)
    percent = int(100 * current)
    progress = int(50*current)
    status = '█' * progress + '-' * (50 - progress)

    print(f' ↳ |{status}| {percent}%\r')

    # sys.stdout.write(' ↳ |{bar}| {percent}%\r'.format(bar=status, percent=percent))
    # sys.stdout.flush()


def complete_func(stream, file_path):
    print(f'complete_func() = 다운로드 완료 : {file_path}')


download_path = r'C:\\Users\\SSAFY\\Desktop\\TJ_MR_Downloads\\Test'
yt = YouTube('http://youtube.com/watch?v=2lAe1cqCOXo')
print(yt.title)
print(yt.thumbnail_url)
yt = YouTube(
        'http://youtube.com/watch?v=2lAe1cqCOXo',
        on_progress_callback=progress_func,
        on_complete_callback=complete_func,
        use_oauth=True,
        allow_oauth_cache=True
    )

yt = yt.streams.first()
yt.download(output_path=download_path)