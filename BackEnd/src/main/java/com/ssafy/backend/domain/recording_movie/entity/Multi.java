package com.ssafy.backend.domain.recording_movie.entity;

import com.ssafy.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Multi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String path;

    private boolean display;

    @ManyToOne
    @JoinColumn(name = "player1")
    private Member player1;

    @ManyToOne
    @JoinColumn(name = "player2")
    private Member player2;
}
