package com.ssafy.backend.domain.song.entity;

import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Song extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 영상의 id값
    private String songVideoId;

    // 노래 제목
    private String songTitle;

    // 가수
    private String songArtist;

    // 영상 URL
    private String songUrl;

    // 썸네일 이미지 URL
    private String songThumbnail;

    // 업로드 날짜
    private String songReleaseDate;

    // 조회수
    private Long SongView;

}
