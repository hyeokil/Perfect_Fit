package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DuetCreateRequestDto {

    private String name;

    private String path;

    public Duet toEntity(Member member) {
        return Duet.builder()
                .name(name)
                .path(path)
                .display(true)
                .uploader(member)
                .build();
    }
}
