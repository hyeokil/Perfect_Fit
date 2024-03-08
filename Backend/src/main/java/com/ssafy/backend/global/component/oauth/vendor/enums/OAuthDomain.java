package com.ssafy.backend.global.component.oauth.vendor.enums;

public enum OAuthDomain {
    KAKAO, NAVER;

    public static OAuthDomain fromName(String providerName) {
        return OAuthDomain.valueOf(providerName.toUpperCase());
    }
}
