package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Single;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleCreateRequestDto {

    private String name;

    private String path;


    public Single toEntity(Member member) {
        return Single.builder()
                .member(member)
                .name(name)
                .path(path)
                .display(true)
                .build();
    }
}
