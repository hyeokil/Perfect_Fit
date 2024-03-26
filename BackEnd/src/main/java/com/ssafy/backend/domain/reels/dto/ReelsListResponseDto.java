package com.ssafy.backend.domain.reels.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.song.entity.Artist;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReelsListResponseDto {
    private Long id;

    private Long time;

    private String songTitle;

    private String songArtist;

    private LocalDateTime createdAt;
}
