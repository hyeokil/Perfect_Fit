package com.ssafy.backend.domain.recording.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DuetFinishedListResponseDto {
    private Long id;
    private String name;
    private String path;
    private String uploaderNickname;
    private String uploaderImage;
    private String participantNickname;
    private String participantImage;
    private LocalDateTime createdAt;

    // 추가할 내용
    // 노래 제목, 가수 이름, 앨범 이미지, 영상 길이
}
