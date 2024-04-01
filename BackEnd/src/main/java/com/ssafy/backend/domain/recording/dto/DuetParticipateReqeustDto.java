package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DuetParticipateReqeustDto {

    private String name;

    private String path;

    private Long uploaderId;

    public Duet toEntity(Member uploader, Member participant, Song song ) {
        return Duet.builder()
                .song(song)
                .name(name)
                .path(path)
                .display(true)
                .uploader(uploader)
                .participant(participant)
                .build();
    }


}
