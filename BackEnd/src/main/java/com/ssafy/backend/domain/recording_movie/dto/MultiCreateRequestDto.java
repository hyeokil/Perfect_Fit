package com.ssafy.backend.domain.recording_movie.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording_movie.entity.Multi;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MultiCreateRequestDto {
    private Long player1;

    private Long player2;

    private String name;

    private String path;

    private boolean display;

    public Multi toEntity(Member player1, Member player2) {
        return Multi.builder()
                .player1(player1)
                .player2(player2)
                .name(name)
                .path(path)
                .display(display)
                .build();
    }
}
