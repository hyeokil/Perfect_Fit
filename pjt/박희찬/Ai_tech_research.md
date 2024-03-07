# AI 관련 기능 구현을 위한 정보 및 분석

# 1. 음악 정보 불러오기

| API명 | 설명 | 인증 | HTTPS | CORS |
| --- | --- | --- | --- | --- |
| AI Mastering | 자동화된 음악 마스터링 | apiKey | ○ | ○ |
| Bandsintown | 음악 행사 | ✕ | ○ | ? |
| Deezer | 음악 | OAuth | ○ | ? |
| Discogs | 음악 | OAuth | ○ | ? |
| Genius | 풍부한 가사와 음악 지식 | OAuth | ○ | ? |
| Genrenator | 음악 장르 생성기 | ✕ | ○ | ? |
| iTunes Search | 소프트웨어 제품 | ✕ | ○ | ? |
| Jamendo | 음악 | OAuth | ○ | ? |
| KKBOX | KKBOX 플랫폼에서 음악 라이브러리, 재생 목록, 차트 및 공연을 가져옵니다. | OAuth | ○ | ? |
| LastFm | 음악 | apiKey | ○ | ? |
| Lyrics.ovh | 노래 가사를 검색하는 간단한 API | ✕ | ○ | ? |
| Mixcloud | 음악 | OAuth | ○ | ○ |
| MusicBrainz | 음악 | ✕ | ○ | ? |
| Musikki | 음악 | apiKey | ○ | ? |
| Musixmatch | 음악 | apiKey | ○ | ? |
| Openwhyd | 스트리밍 트랙의 큐레이션된 재생 목록(YouTube, SoundCloud 등)을 다운로드합니다. | ✕ | ○ | ✕ |
| Songkick | 음악 행사 | OAuth | ○ | ? |
| Songsterr | 기타, 베이스 및 드럼 탭과 코드를 제공합니다. | ✕ | ○ | ? |
| SoundCloud | 사용자가 소리를 업로드하고 공유합니다. | OAuth | ○ | ? |
| Spotify | 스포티파이의 음악 카탈로그 지정, 사용자 라이브러리 관리, 권장 사항 등을 볼 수 있습니다. | OAuth | ○ | ? |
| TasteDive | 유사한 아티스트 API(영화 및 TV 프로그램에도 적용됩니다) | apiKey | ○ | ? |
| TheAudioDB | 음악 | apiKey | ○ | ? |
| Vagalume | 풍부한 가사와 음악 지식 | apiKey | ○ | ? |

## 1-1. Youtube API

- 다른 여러 라이브러리나 API 중 가장 보편적으로 사용 가능한 API.
- 프로젝트 특성 상  MR 검색 시 API를 호출해야함.
    - 사용자가 노래 제목, 가수 등으로 검색
    - API 호출
    - 내부적으로 사용자의 검색어를 Youtube에 검색하여 Contents를 찾음.
    - TJ 미디어가 실제 노래방에서 사용하는 MR을 약 6.4만개의 영상으로 업로드 해놓음.
    - TJ 미디어 채널에서 검색어와 일치하는 MR 영상을 불러옴.

### 과제

- TJ 미디어 채널에서 검색어로 찾을 때, 중복되거나 의도하지 않은 영상이 검색되는 경우를 처리하는 방안.
- Youtube API를 사용할 때, 기본적으로 서비스에 적재해야할 많은 음원 데이터의 확보 방안.

## 1-2. Last.Fm

- 전 세계 음원 데이터를 찾아 활용하기 편하게 만들어진 API 서비스.
- 자체 노래 차트 API가 설계 되어있음 → 직접 스켈레톤으로 사용해봐야 어떤 데이터가 들어오는지 확인할 수 있음.
- 단, 해당 서비스에서 검색한 노래를