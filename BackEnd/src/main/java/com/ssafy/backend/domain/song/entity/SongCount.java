package com.ssafy.backend.domain.song.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SongCount {

    @Id
    private Long songId; // Song 테이블의 ID를 SongCount의 기본 키로 사용

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId // 이 어노테이션은 현재 엔티티의 기본 키를 Song 엔티티의 기본 키와 동일하게 매핑합니다.
    @JoinColumn(name = "song_id") // song 테이블의 기본 키와 매핑됩니다.
    private Song song;

    private Long count;


    public void setCount(long count) {
        this.count = count;
    }
}
