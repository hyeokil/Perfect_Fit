package com.ssafy.backend.global.component.oauth;

import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

public interface OAuthCodeUrlProvider {
    OAuthDomain support();

    String provide(OAuthDomain oAuthDomain);
}
