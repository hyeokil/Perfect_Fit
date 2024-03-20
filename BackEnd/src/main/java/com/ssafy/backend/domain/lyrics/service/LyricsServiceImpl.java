package com.ssafy.backend.domain.lyrics.service;

import com.ssafy.backend.domain.lyrics.dto.LyricsDto;
import com.ssafy.backend.domain.lyrics.repository.LyricsRepository;

import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LyricsServiceImpl implements LyricsService {

    private final SongRepository songRepository;
    private final LyricsRepository lyricsRepository;
    private final RestTemplate restTemplate;


    @Override
    public void updateLyricsAllSongs() {
        for (Song song : songRepository.findAll()) {
            try {
                Long songId = song.getId();

                // 여기서 체크
                if (lyricsRepository.existsBySongId(songId)) {
                    continue; // 이미 존재하면 다음 노래로 넘어감
                }
                String keyword = song.getSongArtist() + " " + song.getSongTitle();
                String searchFloSongIdUrl = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + keyword;
//                System.out.println(songId + ":" + keyword);

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

                // 가사 찾기
                String searchLyricsUrl = "https://www.music-flo.com/api/meta/v1/track/" + floSongId;
                String responseLyrics = restTemplate.getForObject(searchLyricsUrl, String.class);
                String floLyrics = String.valueOf(new JSONObject(responseLyrics)
                        .getJSONObject("data")
                        .getString("lyrics")
                );
                String[] lyricsList = floLyrics.split("\n");
                Long songOrder = 1L;
                for (String lyric : lyricsList) {
                    lyricsRepository.save(LyricsDto.toEntity(song, lyric, songOrder));
                    songOrder += 1;
                }
                System.out.println("저장 ok" + songId);
            } catch (Exception e) {
                continue;
            }

        }
    }
}
