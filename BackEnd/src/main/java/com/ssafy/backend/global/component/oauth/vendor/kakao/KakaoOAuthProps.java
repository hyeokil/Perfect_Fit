package com.ssafy.backend.global.component.oauth.vendor.kakao;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;


@Getter
@Setter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "oauth.kakao")
public class KakaoOAuthProps {

    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String[] scope;
}