package com.ssafy.backend.domain.recording_movie.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording_movie.entity.Single;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleCreateRequestDto {

    private Long memberId;

    private String name;

    private String path;

    private boolean display;

    public Single toEntity(Member memberId) {
        return Single.builder()
                .member(memberId)
                .name(name)
                .path(path)
                .display(display)
                .build();
    }
}
