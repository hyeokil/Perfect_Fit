package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DuetCreateRequestDto {
    private Long player1;

    private Long player2;

    private String name;

    private String path;

    private boolean display;

    public Duet toEntity(Member player1, Member player2) {
        return Duet.builder()
                .player1(player1)
                .player2(player2)
                .name(name)
                .path(path)
                .display(display)
                .build();
    }
}
