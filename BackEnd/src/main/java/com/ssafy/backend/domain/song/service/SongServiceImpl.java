package com.ssafy.backend.domain.song.service;

import com.ssafy.backend.domain.my_list.repository.MyListRepository;
import com.ssafy.backend.domain.song.dto.SongChartResponseDto;
import com.ssafy.backend.domain.my_list.entity.MyList;

import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final MyListRepository myListRepository;
    private final RestTemplate restTemplate;


    //  인기차트100 조회
    @Override
    public List<SongChartResponseDto> getPopular100Songs(Long memberId) {
        return songRepository.findPopular100(memberId)
                .stream()
                .map(song -> {
                    Boolean myListDisplay = myListRepository.findByMemberIdAndSongId(memberId, song.getId())
                            .map(MyList::getMyListDisplay)
                            .orElse(false); // myListDisplay 값이 없으면 false로 설정

                    return SongChartResponseDto.builder()
                            .songId(song.getId())
                            .songTitle(song.getSongTitle())
                            .artist(song.getArtist().getName())
                            .genre(song.getGenre().getName())
                            .songUrl(song.getSongUrl())
                            .songThumbnail(song.getSongThumbnail())
                            .songReleaseDate(song.getSongReleaseDate())
                            .SongView(song.getSongView())
                            .songLength(song.getSongLength())
                            .myListDisplay(myListDisplay)
                            .build();
                })
                .collect(Collectors.toList());
    }



    //  최신차트100 조회
    @Override
    public List<SongChartResponseDto> getLatest100Songs(Long memberId) {
        return songRepository.findLatest100(memberId)
                .stream()
                .map(song -> {
                    Boolean myListDisplay = myListRepository.findByMemberIdAndSongId(memberId, song.getId())
                            .map(MyList::getMyListDisplay)
                            .orElse(false);

                    return SongChartResponseDto.builder()
                            .songId(song.getId())
                            .songTitle(song.getSongTitle())
                            .artist(song.getArtist().getName())
                            .genre(song.getGenre().getName())
                            .songUrl(song.getSongUrl())
                            .songThumbnail(song.getSongThumbnail())
                            .songReleaseDate(song.getSongReleaseDate())
                            .SongView(song.getSongView())
                            .songLength(song.getSongLength())
                            .myListDisplay(myListDisplay)
                            .build();
                })
                .collect(Collectors.toList());
    }



    // 장르별 관련 장르 목록을 저장하는 맵
    private static final Map<String, List<String>> GENRE_KEYWORDS = new HashMap<>();
    static {
        GENRE_KEYWORDS.put("팝", Arrays.asList("팝", "팝록", "일렉트로팝", "팝포크", "팝 락"));
        GENRE_KEYWORDS.put("록", Arrays.asList("록", "모던록", "하드록", "블랙 메탈"));
        GENRE_KEYWORDS.put("힙합", Arrays.asList("힙합", "랩", "랩발라드", "웨스트코스트 힙합"));
        GENRE_KEYWORDS.put("댄스", Arrays.asList("댄스", "일렉트로닉", "하우스", "트랩/크렁크"));
        GENRE_KEYWORDS.put("어쿠스틱", Arrays.asList("어쿠스틱팝", "포크", "인디 포크", "어덜트 컨템포러리 포크"));
        GENRE_KEYWORDS.put("R&B", Arrays.asList("알앤비", "소울", "어번 알앤비", "힙합소울"));
        GENRE_KEYWORDS.put("재즈", Arrays.asList("재즈", "보컬재즈", "재즈힙합", "스무드 재즈"));
        GENRE_KEYWORDS.put("OST", Arrays.asList("OST", "영화", "TV 드라마", "영화 주제곡"));
    }

    // 장르차트100 조회
    @Override
    public List<SongChartResponseDto> getGenre100Songs(Long memberId, String genre) {
        List<String> searchGenres = GENRE_KEYWORDS.getOrDefault(genre, Arrays.asList(genre));
//        System.out.println(searchGenres);
        return songRepository.findGenre100(memberId, searchGenres)
                .stream()
                .map(song -> {
                    Boolean myListDisplay = myListRepository.findByMemberIdAndSongId(memberId, song.getId())
                            .map(MyList::getMyListDisplay)
                            .orElse(false);

                    return SongChartResponseDto.builder()
                            .songId(song.getId())
                            .songTitle(song.getSongTitle())
                            .artist(song.getArtist().getName())
                            .genre(song.getGenre().getName())
                            .songUrl(song.getSongUrl())
                            .songThumbnail(song.getSongThumbnail())
                            .songReleaseDate(song.getSongReleaseDate())
                            .SongView(song.getSongView())
                            .songLength(song.getSongLength())
                            .myListDisplay(myListDisplay)
                            .build();
                })
                .collect(Collectors.toList());
    }


    // 전체 차트 조회
    @Override
    public List<SongChartResponseDto> getAllSongs(Long memberId, int page, int pageSize) {
        int pageNumber = (page - 1) * pageSize;
        return songRepository.findRandomAll(memberId, pageNumber, pageSize)
                .stream()
                .map(song -> {
                    Boolean myListDisplay = myListRepository.findByMemberIdAndSongId(memberId, song.getId())
                            .map(MyList::getMyListDisplay)
                            .orElse(false);

                    return SongChartResponseDto.builder()
                            .songId(song.getId())
                            .songTitle(song.getSongTitle())
                            .artist(song.getArtist().getName())
                            .genre(song.getGenre().getName())
                            .songUrl(song.getSongUrl())
                            .songThumbnail(song.getSongThumbnail())
                            .songReleaseDate(song.getSongReleaseDate())
                            .SongView(song.getSongView())
                            .songLength(song.getSongLength())
                            .myListDisplay(myListDisplay)
                            .build();
                })
                .collect(Collectors.toList());
    }


    // 노래 검색
    @Override
    public List<SongChartResponseDto> searchSongs(String keyword) {
        return songRepository.searchSongs(keyword)
                .stream()
                .map(song -> {
                    return SongChartResponseDto.builder()
                            .songId(song.getId())
                            .songTitle(song.getSongTitle())
                            .artist(song.getArtist().getName())
                            .genre(song.getGenre().getName())
                            .songUrl(song.getSongUrl())
                            .songThumbnail(song.getSongThumbnail())
                            .songReleaseDate(song.getSongReleaseDate())
                            .SongView(song.getSongView())
                            .songLength(song.getSongLength())
                            .build();
                })
                .collect(Collectors.toList());
    }


    //  현 시간대에 많이 부른 노래 차트100 조회
    @Override
    public List<SongChartResponseDto> findPopularSongs100ByHour(Long memberId) {
        return songRepository.findPopularSongs100ByHour(memberId)
                .stream()
                .map(song -> {
                    Boolean myListDisplay = myListRepository.findByMemberIdAndSongId(memberId, song.getId())
                            .map(MyList::getMyListDisplay)
                            .orElse(false);

                    return SongChartResponseDto.builder()
                            .songId(song.getId())
                            .songTitle(song.getSongTitle())
                            .artist(song.getArtist().getName())
                            .genre(song.getGenre().getName())
                            .songUrl(song.getSongUrl())
                            .songThumbnail(song.getSongThumbnail())
                            .songReleaseDate(song.getSongReleaseDate())
                            .SongView(song.getSongView())
                            .songLength(song.getSongLength())
                            .myListDisplay(myListDisplay)
                            .build();
                })
                .collect(Collectors.toList());
    }




//    // @Value 어노테이션을 사용하여 application.yml에서 정의한 YouTube API 키를 주입 받음 (cmd+click하면 추적가능)
//    @Value("${youtube.api.key}")
//    private String apiKey;
//    // 유튜브 TJ미디어 채널 ID
//    private static final String CHANNEL_ID = "UCZUhx8ClCv6paFW7qi3qljg";
//    // 유튜브 금영노래방 채널 ID
////    private static final String CHANNEL_ID = "";
//
//    // 노래 정보 저장 함수
//    @Override
//    public String getChannelVideos() throws IOException {
//        JsonFactory jsonFactory = new JacksonFactory();
//        YouTube youtubeService = new YouTube.Builder(
//                new NetHttpTransport(),
//                jsonFactory,
//                request -> {})
//                .build();
//
//        List<String> playlistIds = new ArrayList<>();
//
//
//        YouTube.Playlists.List playlistsRequest = youtubeService.playlists().list(List.of("id"));
//        playlistsRequest.setChannelId(CHANNEL_ID);
//        playlistsRequest.setMaxResults(50L);
//        playlistsRequest.setKey(apiKey);
//
//        PlaylistListResponse playlistsResponse = playlistsRequest.execute();
//        for (Playlist playlist : playlistsResponse.getItems()) {
//            playlistIds.add(playlist.getId());
//        }
//
//        // 각 플레이리스트의 videoId를 가져옴
//        for (String playlistId : playlistIds) {
//            YouTube.PlaylistItems.List playlistItemsRequest = youtubeService.playlistItems().list(List.of("contentDetails"));
//            playlistItemsRequest.setPlaylistId(playlistId);
//            playlistItemsRequest.setMaxResults(50L);
//            playlistItemsRequest.setKey(apiKey);
//
//            List<String> videoIds = new ArrayList<>();
//
//            PlaylistItemListResponse playlistItemResponse = playlistItemsRequest.execute();
//            for (PlaylistItem item : playlistItemResponse.getItems()) {
//                if (item.getContentDetails().getVideoId() == null) {
//                    continue;
//                }
//                videoIds.add(item.getContentDetails().getVideoId());
//            }
//
//            // 각 비디오의 정보를 불러와서 DB에 저장함.
//            YouTube.Videos.List videosRequest = youtubeService.videos().list(List.of("snippet", "statistics", "contentDetails"));
//            videosRequest.setId(videoIds);
//            videosRequest.setKey(apiKey);
//
//            VideoListResponse videosResponse = videosRequest.execute();
//            for (Video video : videosResponse.getItems()) {
//
//                String songVideoId = video.getId();
//                String songTitle = extractSongInfo(video.getSnippet().getTitle())[0];
//                // title 값이 null이면, 저장 패스 (youtube 영상에 노래 관련 영상이 아닌거 있음)
//                if (songTitle.isEmpty()) {
//                    continue;
//                }
//                String songArtist = extractSongInfo(video.getSnippet().getTitle())[1];
//                String songUrl = "https://www.youtube.com/watch?v=" + songVideoId;
//                Long songView = video.getStatistics().getViewCount().longValue();
//
//                Song song = Song.builder()
//                        .songVideoId(songVideoId)
//                        .songTitle(songTitle)
//                        .songArtist(songArtist)
//                        .songUrl(songUrl)
//                        .SongView(songView)
//                        .build();
//                songRepository.save(song);
//            }
//        }
//        return "playlist : " + String.join("\nplaylist : ",playlistIds);
//    }
//
//
//    // 영상 title에서 노래명, 가수명 추출하는 메서드
//    public String[] extractSongInfo(String inputData) {
//        // 정규 표현식
//        final Pattern pattern = Pattern.compile("\\[TJ노래방( / 남자키| / 여자키)?\\] (.+) - (.+) / TJ Karaoke");  // TJ 미디어
////        final Pattern pattern = Pattern.compile("\\[(?:.+?)\\]\\s*(?:\\[.+?\\])?\\s*(.+?)\\s*\\-\\s*(.+?)\\s*\\(KY\\.\\d+\\)\\s*/\\s*KY Karaoke");  // 금영노래방
//        Matcher matcher = pattern.matcher(inputData);
//
//        if (matcher.find()) {
//            // TJ
//            String songTitle = matcher.group(2);  // 노래 제목
//            String songArtist = matcher.group(3);  // 가수 이름
//            // 금영
////            String songTitle = matcher.group(1);  // 노래 제목
////            String songArtist = matcher.group(2);  // 가수 이름
//            return new String[] {songTitle, songArtist};  // 0번 index는 제목, 1번 index는 가수명
//        } else {
//            return new String[] {"", ""};  // 없으면 빈 문자열 반환
//        }
//    }
//
//
//    @Override
//    @Transactional
//    public void updateSongsFlo() {
//        for (Song song : songRepository.findAll()) {
//            try {
//                Long songId = song.getId();
//
//                String keyword = song.getSongArtist() + " " + song.getSongTitle();
//                String searchFloSongIdUrl = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + keyword;
//
//                // Flo 노래 ID 찾기
//                String responseFloSongId = restTemplate.getForObject(searchFloSongIdUrl, String.class);
//                String floSongId = String.valueOf(new JSONObject(responseFloSongId)
//                        .getJSONObject("data")
//                        .getJSONArray("list")
//                        .getJSONObject(0)
//                        .getJSONArray("list")
//                        .getJSONObject(0)
//                        .getLong("id")
//                );
//
//                // 노래 정보 찾기
//                String searchLyricsUrl = "https://www.music-flo.com/api/meta/v1/track/" + floSongId;
//                String responseLyrics = restTemplate.getForObject(searchLyricsUrl, String.class);
//                String floInfo = String.valueOf(new JSONObject(responseLyrics)
//                        .getJSONObject("data")
//                        .getJSONObject("album")
//                );
//                String floGenre = String.valueOf(new JSONObject(floInfo)
//                        .getString("genreStyle")
//                );
//                String floReleaseDate = String.valueOf(new JSONObject(floInfo)
//                        .getString("releaseYmd")
//                );
//                String floThumbnail = String.valueOf(new JSONObject(floInfo)
//                        .getJSONArray("imgList")
//                        .getJSONObject(4)
//                        .getString("url")
//                );
//
//                song.setSongGenre(floGenre);
//                song.setSongReleaseDate(floReleaseDate);
//                song.setSongThumbnail(floThumbnail);
//
//                songRepository.save(song);
//
//                System.out.println("ok");
//            } catch (Exception e) {
//                continue;
//            }
//        }
//    }



}