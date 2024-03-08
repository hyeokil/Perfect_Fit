package com.ssafy.backend.global.component.oauth.vendor.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(SnakeCaseStrategy.class)
public class NaverToken {
    private String tokenType;
    private String accessToken;
    private String idToken;
    private String expiresIn;
    private String refreshToken;
    private String refreshTokenExpiresIn;
    private String scope;
}
