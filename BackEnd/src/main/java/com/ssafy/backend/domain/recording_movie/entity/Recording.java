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

    // 자기 자신
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "single_id")
    private Member single;

    // 듀엣모드에서 상대방
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "multi_id")
    private Member multi;

    // 영상 이름
    private String name;

    // 파일 경로
    private String path;

    // 사용자에게 보여줄지 여부
    private boolean display;
}
