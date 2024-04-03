package com.ssafy.backend.domain.recording.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DuetListResponseDto {
    private Long id;
    private String name;
    private String uploaderUserPath;
    private String uploaderAudioPath;
    private Long uploaderId;
    private String uploaderNickname;
    private String uploaderImage;
    private LocalDateTime createdAt;
    private Long songId;
    private String songMrPath;
    private String songTitle;
    private String artistName;
    private String songThumbnail;



}
