package com.ssafy.backend.domain.reels.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.reels.entity.Reels;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReelsCreateRequestDto {

    private Long songId;

    private Long time;

    private String userPath;

    private String audioPath;


    // 노래 정보에 관한 코드 넣어야 됨
    public Reels toEntity(Member member, Song song) {
        return Reels.builder()
                .time(time)
                .member(member)
                .userPath(userPath)
                .audioPath(audioPath)
                .song(song)
                .build();
    }
}
