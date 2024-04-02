package com.ssafy.backend.domain.recording.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Single;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SingleCreateRequestDto {

    private String name;

    private String userPath;

    private String audioPath;


    public Single toEntity(Member member, Song song) {
        return Single.builder()
                .song(song)
                .member(member)
                .name(name)
                .userPath(userPath)
                .audioPath(audioPath)
                .display(true)
                .build();
    }
}
