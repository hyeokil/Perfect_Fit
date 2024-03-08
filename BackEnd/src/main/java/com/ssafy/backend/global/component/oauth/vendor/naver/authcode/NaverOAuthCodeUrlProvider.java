package com.ssafy.backend.global.component.oauth.vendor.naver.authcode;

import com.ssafy.backend.global.component.oauth.OAuthCodeUrlProvider;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import com.ssafy.backend.global.component.oauth.vendor.naver.NaverOAuthProps;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class NaverOAuthCodeUrlProvider implements OAuthCodeUrlProvider {

    private final NaverOAuthProps props;

    @Override
    public OAuthDomain support() {
        return OAuthDomain.NAVER;
    }

    @Override
    public String provide(OAuthDomain oAuthDomain) {
        return UriComponentsBuilder
                .fromUriString("https://nid.naver.com/oauth2.0/authorize")
                .queryParam("response_type", "code")
                .queryParam("client_id", props.getClientId())
                .queryParam("redirect_uri", props.getRedirectUri())
                .queryParam("state", props.getState())
                .toUriString();
    }
}
