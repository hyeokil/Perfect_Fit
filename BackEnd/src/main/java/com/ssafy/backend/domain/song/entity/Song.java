package com.ssafy.backend.domain.song.entity;

import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 영상의 id값(MR)
    private String songVideoId;

    // 노래 제목
    private String songTitle;

    // MR 영상 URL
    private String songUrl;

    // 노래 영상 URL
    private String songOriginUrl;

    // 썸네일 이미지 URL
    private String songThumbnail;

    // 노래 발매일
    private String songReleaseDate;

    // 조회수
    private Long SongView;

    // 노래길이
    private String songLength;

    // 가수 참조
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    // 장르 참조
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genre_id")
    private Genre genre;

}
