package com.ssafy.backend.global.component.oauth;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

public interface OAuthMemberClient {

    OAuthDomain getOAuthDomain();

    Member fetch(OAuthDomain oAuthServerType, String authCode);
}
