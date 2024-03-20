package com.ssafy.backend.domain.member.entity;

import com.ssafy.backend.domain.member.dto.MemberUpdateDto;
import com.ssafy.backend.global.common.entity.BaseEntity;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String nickname;

    private String image;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    private OAuthDomain oAuthDomain;

    public void updateImageAndNickname(MemberUpdateDto memberUpdateDto) {
        this.nickname = memberUpdateDto.getNickname();
        this.image = memberUpdateDto.getImage();
    }

}