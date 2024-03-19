package com.ssafy.backend.domain.lyrics.service;

import com.ssafy.backend.domain.lyrics.dto.LyricsDto;
import com.ssafy.backend.domain.lyrics.dto.SongInfoDto;
import com.ssafy.backend.domain.lyrics.entity.Lyrics;
import com.ssafy.backend.domain.lyrics.repository.LyricsRepository;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class LyricsServiceImpl implements LyricsService{

    private final SongRepository songRepository;
    private final LyricsRepository lyricsRepository;
    private final RestTemplate restTemplate;


    @Override
    public void updateLyricsAllSongs() {
        for (Song song : songRepository.findAll()) {
            String keyword = song.getSongArtist() + " " + song.getSongTitle();
            String searchSongIdUrl = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + keyword;

            SongInfoDto[] searchSongIdResult = restTemplate.getForObject(searchSongIdUrl, SongInfoDto[].class);
            if (searchSongIdResult != null && searchSongIdResult.length > 0) {
                Long songId = searchSongIdResult[0].getId();
                String lyricsUrl = "https://www.music-flo.com/api/meta/v1/track/" + songId;
                LyricsDto lyricsDto = restTemplate.getForObject(lyricsUrl, LyricsDto.class);
                if (lyricsDto != null) {
                    String lyricsScript = lyricsDto.getLyrics();

                    Lyrics lyrics = Lyrics.builder()
                                            .song(song)
                                            .script(lyricsScript)
                                            .build();
                    lyricsRepository.save(lyrics);
                }
            }
        }


    }


}
