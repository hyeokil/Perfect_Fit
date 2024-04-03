package com.ssafy.backend.domain.lyrics.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LyricsResponseDto {

    private Long order;
    private String script;
    private String time;

}

