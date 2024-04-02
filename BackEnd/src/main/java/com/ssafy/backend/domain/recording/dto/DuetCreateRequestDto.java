package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DuetCreateRequestDto {

    private String name;

    private String userPath;

    private String audioPath;

    public Duet toEntity(Member member, Song song) {
        return Duet.builder()
                .song(song)
                .name(name)
                .userPath(userPath)
                .audioPath(audioPath)
                .display(true)
                .uploader(member)
                .build();
    }
}
