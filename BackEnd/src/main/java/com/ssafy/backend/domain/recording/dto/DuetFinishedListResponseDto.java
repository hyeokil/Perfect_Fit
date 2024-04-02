package com.ssafy.backend.domain.recording.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DuetFinishedListResponseDto {
    private Long id;
    private String name;
    private String userPath;
    private String audioPath;
    private String uploaderNickname;
    private String uploaderImage;
    private String participantNickname;
    private String participantImage;
    private LocalDateTime createdAt;
    private String songTitle;
    private String artistName;
    private String songThumbnail;


}
