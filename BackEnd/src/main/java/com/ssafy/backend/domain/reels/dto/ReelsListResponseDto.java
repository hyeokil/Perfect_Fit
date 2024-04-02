package com.ssafy.backend.domain.reels.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReelsListResponseDto {
    private Long id;

    private Long time;

    private String userPath;

    private String audioPath;

    private String songTitle;

    private String artistName;

    private String songThumbnail;

    private LocalDateTime createdAt;
}
