package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberGetResponseDto;
import com.ssafy.backend.domain.member.dto.MemberUpdateDto;
import com.ssafy.backend.global.component.jwt.dto.TokenMemberInfoDto;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

public interface MemberService {
    String provideAuthCodeRequestUrl(OAuthDomain oauthDomain);

    TokenMemberInfoDto login(OAuthDomain oauthDomain, String authCode);

    // 로그아웃
    void logoutMember(String email);

    // 프로필 이미지 및 닉네임 수정
    void updateImageAndNicknameMember(Long id, MemberUpdateDto updateDto);

    // 나의 정보 가져오기 기능
    MemberGetResponseDto getMember(Long id);
}