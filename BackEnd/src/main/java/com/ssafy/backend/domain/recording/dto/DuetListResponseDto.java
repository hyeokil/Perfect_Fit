package com.ssafy.backend.domain.recording.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DuetListResponseDto {
    private Long id;
    private String name;
    private String path;
    private String uploaderNickname;
    private String uploaderImage;
    private LocalDateTime createdAt;
    private Long songId;
    private String songTitle;
    private String artistName;
    private String songThumbnail;


}
