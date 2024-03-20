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

    public static Lyrics toEntity(Song song, String script) {
        return Lyrics.builder()
                .song(song)
                .script(script)
                .build();
    }

}
