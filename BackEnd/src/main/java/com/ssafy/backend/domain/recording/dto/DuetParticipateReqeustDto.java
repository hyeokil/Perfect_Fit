package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DuetParticipateReqeustDto {

    private String name;

    private String path;

    private Long uploaderId;

    public Duet toEntity(Member uploader, Member participant ) {
        return Duet.builder()
                .name(name)
                .path(path)
                .display(true)
                .uploader(uploader)
                .participant(participant)
                .build();
    }


}
