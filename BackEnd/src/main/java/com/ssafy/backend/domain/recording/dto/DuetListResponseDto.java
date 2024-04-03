package com.ssafy.backend.domain.recording.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DuetListResponseDto {
    private Long id;
    private String name;
    private String userPath;
    private String audioPath;
    private Long uploaderId;
    private String uploaderNickname;
    private String uploaderImage;
    private LocalDateTime createdAt;
    private Long songId;
    private String songTitle;
    private String artistName;
    private String songThumbnail;

    // 추가할 내용
    // 노래 제목, 가수 이름, 앨범 이미지, 영상 길이

}
