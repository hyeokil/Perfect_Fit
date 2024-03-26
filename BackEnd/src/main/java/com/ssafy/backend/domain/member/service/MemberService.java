package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberGetResponseDto;
import com.ssafy.backend.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.backend.domain.member.dto.MemberUpdateDto;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.jwt.dto.TokenMemberInfoDto;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

import java.util.List;

public interface MemberService {

    // 일반 회원가입 test
    void signUpMember(String email);
    // 일반 로그인
    TokenMemberInfoDto loginCheckMember(MemberLoginRequestDto loginRequestDto);

    String provideAuthCodeRequestUrl(OAuthDomain oauthDomain);

    // 소셜 로그인
    TokenMemberInfoDto login(OAuthDomain oauthDomain, String authCode);

    // 로그아웃
    void logoutMember(String email);

    // 프로필 이미지 및 닉네임 수정
    void updateImageAndNicknameMember(Long id, MemberUpdateDto updateDto);

    // 나의 정보 가져오기 기능
    MemberGetResponseDto getMember(Long id);

    List<MemberGetResponseDto> searchMember(String keyword);
}