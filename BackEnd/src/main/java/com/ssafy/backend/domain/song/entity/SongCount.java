package com.ssafy.backend.domain.song.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class SongCount {

    // 복합키
    @EmbeddedId
    private SongCountId songId;

    // 초기값을 0으로 설정
    private Long count = 0L;

}
