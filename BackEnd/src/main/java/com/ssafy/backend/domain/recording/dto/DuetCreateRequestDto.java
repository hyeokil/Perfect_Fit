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

    private String uploaderUserPath;

    private String uploaderAudioPath;

    public Duet toEntity(Member member, Song song) {
        return Duet.builder()
                .song(song)
                .name(name)
                .uploaderUserPath(uploaderUserPath)
                .uploaderAudioPath(uploaderAudioPath)
                .display(true)
                .uploader(member)
                .build();
    }
}
