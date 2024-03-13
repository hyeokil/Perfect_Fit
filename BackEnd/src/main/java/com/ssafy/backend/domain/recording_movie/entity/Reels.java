package com.ssafy.backend.domain.recording_movie.entity;

import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Reels extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @ManyToOne
    @JoinColumn(name = "recording_id")
    private Recording recording;

    // 조회 수
    private Long view;

    // 릴스 영상 길이
    private Long time;

    // 파일 경로
    private String path;
}
