package com.ssafy.backend.global.component.jwt.dto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

import static com.ssafy.backend.global.component.jwt.JwtUtils.*;
import static javax.management.timer.Timer.ONE_MINUTE;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class TokenMemberInfoDto {
    private Long id;
    private String email;
    private String nickname;
    private String image;

    public Claims toClaims(int expiresMin) {
        Claims claims = Jwts.claims();

        Date now = new Date();

        claims.put(KEY_ID, this.id);
        claims.put(KEY_EMAIL, this.email);
        claims.put(KEY_NICKNAME, this.nickname);
        claims.put(KEY_IMAGE, this.image);
        claims.setExpiration(new Date(now.getTime() + expiresMin * ONE_MINUTE));

        return claims;
    }

    public static TokenMemberInfoDto from(Claims claims) {
        return TokenMemberInfoDto.builder()
                .id(claims.get(KEY_ID, Long.class))
                .email(claims.get(KEY_EMAIL, String.class))
                .nickname(claims.get(KEY_NICKNAME, String.class))
                .image(claims.get(KEY_IMAGE, String.class))
                .build();
    }

}
