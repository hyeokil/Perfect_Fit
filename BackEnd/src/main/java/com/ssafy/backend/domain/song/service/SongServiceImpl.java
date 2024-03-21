package com.ssafy.backend.domain.song.service;

import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.*;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final RestTemplate restTemplate;


    //@Value 어노테이션을 사용하여 application.yml에서 정의한 YouTube API 키를 주입 받음 (cmd+click하면 추적가능)
    @Value("${youtube.api.key}")
    private String apiKey;

    // 유튜브 TJ미디어 채널 ID
    private static final String CHANNEL_ID = "UCZUhx8ClCv6paFW7qi3qljg";
    // 유튜브 금영노래방 채널 ID
//    private static final String CHANNEL_ID = "";


    // 노래 정보 저장 함수
    @Override
    public String getChannelVideos() throws IOException {
        JsonFactory jsonFactory = new JacksonFactory();
        YouTube youtubeService = new YouTube.Builder(
                new NetHttpTransport(),
                jsonFactory,
                request -> {})
                .build();

        List<String> playlistIds = new ArrayList<>();


        YouTube.Playlists.List playlistsRequest = youtubeService.playlists().list(List.of("id"));
        playlistsRequest.setChannelId(CHANNEL_ID);
        playlistsRequest.setMaxResults(50L);
        playlistsRequest.setKey(apiKey);

        PlaylistListResponse playlistsResponse = playlistsRequest.execute();
        for (Playlist playlist : playlistsResponse.getItems()) {
            playlistIds.add(playlist.getId());
        }

        // 각 플레이리스트의 videoId를 가져옴
        for (String playlistId : playlistIds) {
            YouTube.PlaylistItems.List playlistItemsRequest = youtubeService.playlistItems().list(List.of("contentDetails"));
            playlistItemsRequest.setPlaylistId(playlistId);
            playlistItemsRequest.setMaxResults(50L);
            playlistItemsRequest.setKey(apiKey);

            List<String> videoIds = new ArrayList<>();

            PlaylistItemListResponse playlistItemResponse = playlistItemsRequest.execute();
            for (PlaylistItem item : playlistItemResponse.getItems()) {
                if (item.getContentDetails().getVideoId() == null) {
                    continue;
                }
                videoIds.add(item.getContentDetails().getVideoId());
            }

            // 각 비디오의 정보를 불러와서 DB에 저장함.
            YouTube.Videos.List videosRequest = youtubeService.videos().list(List.of("snippet", "statistics", "contentDetails"));
            videosRequest.setId(videoIds);
            videosRequest.setKey(apiKey);

            VideoListResponse videosResponse = videosRequest.execute();
            for (Video video : videosResponse.getItems()) {

                String songVideoId = video.getId();
                String songTitle = extractSongInfo(video.getSnippet().getTitle())[0];
                // title 값이 null이면, 저장 패스 (youtube 영상에 노래 관련 영상이 아닌거 있음)
                if (songTitle.isEmpty()) {
                    continue;
                }
                String songArtist = extractSongInfo(video.getSnippet().getTitle())[1];
                String songUrl = "https://www.youtube.com/watch?v=" + songVideoId;
                String songThumbnail = video.getSnippet().getThumbnails().getDefault().getUrl();
                String songReleaseDate = video.getSnippet().getPublishedAt().toStringRfc3339();
                Long songView = video.getStatistics().getViewCount().longValue();

                Song song = Song.builder()
                        .songVideoId(songVideoId)
                        .songTitle(songTitle)
                        .songArtist(songArtist)
                        .songUrl(songUrl)
                        .songThumbnail(songThumbnail)
                        .songReleaseDate(songReleaseDate)
                        .SongView(songView)
                        .build();
                songRepository.save(song);
            }
        }
        return "playlist : " + String.join("\nplaylist : ",playlistIds);
    }


    // 영상 title에서 노래명, 가수명 추출하는 메서드
    public String[] extractSongInfo(String inputData) {
        // 정규 표현식
        final Pattern pattern = Pattern.compile("\\[TJ노래방( / 남자키| / 여자키)?\\] (.+) - (.+) / TJ Karaoke");  // TJ 미디어
//        final Pattern pattern = Pattern.compile("\\[(?:.+?)\\]\\s*(?:\\[.+?\\])?\\s*(.+?)\\s*\\-\\s*(.+?)\\s*\\(KY\\.\\d+\\)\\s*/\\s*KY Karaoke");  // 금영노래방
        Matcher matcher = pattern.matcher(inputData);

        if (matcher.find()) {
            // TJ
            String songTitle = matcher.group(2);  // 노래 제목
            String songArtist = matcher.group(3);  // 가수 이름
            // 금영
//            String songTitle = matcher.group(1);  // 노래 제목
//            String songArtist = matcher.group(2);  // 가수 이름
            return new String[] {songTitle, songArtist};  // 0번 index는 제목, 1번 index는 가수명
        } else {
            return new String[] {"", ""};  // 없으면 빈 문자열 반환
        }
    }


    @Override
    @Transactional
    public void updateSongsFlo() {
        for (Song song : songRepository.findAll()) {
            try {
                Long songId = song.getId();

                String keyword = song.getSongArtist() + " " + song.getSongTitle();
                String searchFloSongIdUrl = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + keyword;

                // Flo 노래 ID 찾기
                String responseFloSongId = restTemplate.getForObject(searchFloSongIdUrl, String.class);
                String floSongId = String.valueOf(new JSONObject(responseFloSongId)
                        .getJSONObject("data")
                        .getJSONArray("list")
                        .getJSONObject(0)
                        .getJSONArray("list")
                        .getJSONObject(0)
                        .getLong("id")
                );

                // 노래 정보 찾기
                String searchLyricsUrl = "https://www.music-flo.com/api/meta/v1/track/" + floSongId;
                String responseLyrics = restTemplate.getForObject(searchLyricsUrl, String.class);
                String floInfo = String.valueOf(new JSONObject(responseLyrics)
                        .getJSONObject("data")
                        .getJSONObject("album")
                );
                String floGenre = String.valueOf(new JSONObject(floInfo)
                        .getString("genreStyle")
                );
                String floReleaseDate = String.valueOf(new JSONObject(floInfo)
                        .getString("releaseYmd")
                );
                String floThumbnail = String.valueOf(new JSONObject(floInfo)
                        .getJSONArray("imgList")
                        .getJSONObject(4)
                        .getString("url")
                );

                song.setSongGenre(floGenre);
                song.setSongReleaseDate(floReleaseDate);
                song.setSongThumbnail(floThumbnail);

                songRepository.save(song);

                System.out.println("ok");
            } catch (Exception e) {
                continue;
            }

        }
    }

}