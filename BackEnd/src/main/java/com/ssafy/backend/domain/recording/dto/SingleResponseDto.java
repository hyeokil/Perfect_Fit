package com.ssafy.backend.domain.recording.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SingleResponseDto {

    private Long id;

    private String name;

    private String path;

    private LocalDateTime createdAt;

    // 추가할 내용
    // 노래 제목, 가수 이름, 앨범 이미지, 영상 길이

}
