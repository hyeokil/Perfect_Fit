package com.ssafy.backend.domain.my_list.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetMyListResponseDto {


    private Long songId;

    // 노래 제목
    private String songTitle;

    // 가수명
    private String artist;

    // 장르
    private String genre;

    // MR 영상 URL
    private String songUrl;

    // 썸네일 이미지 URL
    private String songThumbnail;

    // 노래 발매일
    private String songReleaseDate;

    // 조회수
    private Long SongView;

    // 노래길이
    private String songLength;

    // 노래 좋아요 유무
    private boolean myListDisplay;

    // 노래 음정
    private Integer songPitch;

    // s3 경로
    private String mrPath;

}
