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

    // 영상의 id값(MR)
    private String songVideoId;

    // 노래 제목
    private String songTitle;

    // 가수명
    private String songArtist;

    // 장르
    private String songGenre;

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


    public void setSongGenre(String songGenre) {
        this.songGenre = songGenre;
    }

    public void setSongReleaseDate(String songReleaseDate) {
        this.songReleaseDate = songReleaseDate;
    }

    public void setSongThumbnail(String songThumbnail) {
        this.songThumbnail = songThumbnail;
    }


}
