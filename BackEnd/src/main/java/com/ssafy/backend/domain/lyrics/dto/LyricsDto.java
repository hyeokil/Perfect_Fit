package com.ssafy.backend.domain.lyrics.dto;

import com.ssafy.backend.domain.lyrics.entity.Lyrics;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LyricsDto {

    private Long songId;
    private String script;
    private Long order;

    public static Lyrics toEntity(Song song, String script, Long order) {
        return Lyrics.builder()
                .song(song)
                .lyricsScript(script)
                .lyricsOrder(order)
                .build();
    }

}
