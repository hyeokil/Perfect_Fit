package com.ssafy.backend.domain.reels.entity;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.song.entity.Song;
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

    private Long time;

    private String path;

    @ManyToOne
    @JoinColumn(name = "song_id")
    private Song song;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 노래 정보 넣어야 됨
}
