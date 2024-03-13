package com.ssafy.backend.domain.recording_movie.entity;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 생성자의 접근 수준을 protected로 설정, 클래스 외부에서는 객체 생성 x
@AllArgsConstructor(access = AccessLevel.PROTECTED) // 모든 필드를 매개변수로 받는 생성자를 생성
public class Recording extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @OneToMany(mappedBy = "recording", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reels> reels;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_member_id")
    private Member creatorMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_member_id")
    private Member participantMember;

    private String name;

    private String path;

    private boolean display;
}
