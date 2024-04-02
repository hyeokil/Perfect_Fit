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

    private String userPath;

    private String audioPath;

    private boolean display;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


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
