package com.ssafy.backend.domain.recording.entity;

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
public class Single extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String path;

    private boolean display;

    // postman에서 요청을 보낼 때 fetch의 요청이 LAZY일 경우 지연이 발생해 400에러가 발생 나중에 주석을 풀어주어야 한다.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 재훈이 코드가 완성되서 db가 넘어와야 song_id에 관한 코드 구현
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id")
    private Song song;

    public void delete() {
        this.display = false;
    }

    public void updateName(String name) {
        this.name = name;
    }

}
