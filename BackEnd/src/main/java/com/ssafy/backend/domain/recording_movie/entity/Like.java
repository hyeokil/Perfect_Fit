package com.ssafy.backend.domain.recording_movie.entity;

import com.ssafy.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    // 회원 id와 1대 다 관계
    // fetch를 사용하여 member 엔티티를 실제로 접근할 때 까지 로딩을 지연시킨다.
    // 해당 member에 접근 하였을 때 Member의 id가 로드된다.
    // 성능 최적화를 위하여 (이렇게 해야 성능 최적화가 되겠지?????)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 릴스 id 와 1대 다 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reels_id")
    private Reels reels;
}
