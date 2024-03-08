package com.ssafy.backend.global.component.oauth.vendor.kakao.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * KakaoToken 클래스는 카카오 API로부터 받은 토큰 정보를 저장합니다.
 * JSON 응답은 Snake Case 전략을 사용하여 매핑됩니다.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(SnakeCaseStrategy.class)
public class KakaoToken {

    private String accessToken; // 카카오 API로부터 받은 액세스 토큰
    private String refreshToken;    // 카카오 API로부터 받은 리프레시 토큰.
    private String tokenType;   // 토큰 타입 (보통 "Bearer")
    private String expiresIn;   // 토큰의 만료 시간
    private String error;   // 오류 코드 (오류 발생 시)
    private String errorDescription;    // 오류 설명 (오류 발생 시)
}

