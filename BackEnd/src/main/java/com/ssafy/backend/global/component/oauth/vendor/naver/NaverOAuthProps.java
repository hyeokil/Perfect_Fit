package com.ssafy.backend.global.component.oauth.vendor.naver;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@RequiredArgsConstructor
@ConfigurationProperties(prefix = "oauth.naver")
public class NaverOAuthProps {
    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String[] scope;
    private String state;
}
