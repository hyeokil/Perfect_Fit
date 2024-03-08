package com.ssafy.backend.global.component.jwt;

import com.ssafy.backend.global.exception.GlobalError;
import com.ssafy.backend.global.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.Key;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtParser {
    public Claims parseToken(String token, Key secretKey) {
        Claims claims;

        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token).getBody();
        } catch (Exception e) {
            throw new TokenException(GlobalError.INVALID_TOKEN);
        }

        return claims;
    }

}
