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

    private String uploaderUserPath;

    private String uploaderAudioPath;

    private String participantUserPath;

    private String participantAudioPath;

    private Long uploaderId;

    public Duet toEntity(Member uploader, Member participant , Song song) {
        return Duet.builder()
                .song(song)
                .name(name)
                .uploaderUserPath(uploaderUserPath)
                .uploaderAudioPath(uploaderAudioPath)
                .participantUserPath(participantUserPath)
                .participantAudioPath(participantAudioPath)
                .display(true)
                .uploader(uploader)
                .participant(participant)
                .build();
    }


}
