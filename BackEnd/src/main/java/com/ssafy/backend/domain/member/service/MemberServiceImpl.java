package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberGetResponseDto;
import com.ssafy.backend.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.backend.domain.member.dto.MemberUpdateDto;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording.dto.DuetListResponseDto;
import com.ssafy.backend.domain.recording.entity.Duet;
import com.ssafy.backend.global.component.jwt.dto.TokenMemberInfoDto;
import com.ssafy.backend.global.component.jwt.repository.RefreshRepository;
import com.ssafy.backend.global.component.oauth.OAuthCodeUrlProvider;
import com.ssafy.backend.global.component.oauth.OAuthMemberClient;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class MemberServiceImpl implements MemberService {

    private final OAuthCodeUrlProvider oAuthCodeUrlProvider;
    private final OAuthMemberClient oAuthMemberClient;
    private final MemberRepository memberRepository;
    private final RefreshRepository refreshRepository;

    @Override
    public void signUpMember(String email) {
        Member member = Member.builder()
                .email(email)
//                .nickname(null)
//                .image(null)
//                .oAuthDomain(null)
                .build();
        memberRepository.save(member);
    }

    @Override
    public TokenMemberInfoDto loginCheckMember(MemberLoginRequestDto loginRequestDto) {
        Member member = memberRepository.findByEmail(loginRequestDto.getEmail()).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));

        return TokenMemberInfoDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .image(member.getImage())
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public String provideAuthCodeRequestUrl(OAuthDomain oauthDomain) {
        return oAuthCodeUrlProvider.provide(oauthDomain);
    }

    @Override
    public TokenMemberInfoDto login(OAuthDomain oauthDomain, String authCode) {
        Member oauthMember = oAuthMemberClient.fetch(oauthDomain, authCode);
        Member member = memberRepository.findByEmail(oauthMember.getEmail())
                .orElseGet(() -> memberRepository.save(oauthMember));

        return TokenMemberInfoDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .image(member.getImage())
                .build();
    }

    @Override
    public void logoutMember(String email) {
        // 레디스에서 토큰 찾기
        Optional<String> token = refreshRepository.find(email);
        if (token.isEmpty()) {
            // 토큰이 존재하지 않는 경우 예외 발생
            throw new MemberException(MemberError.ALREADY_MEMBER_LOGOUT);
        }

        // 토큰이 존재하면 삭제
        refreshRepository.delete(email);
    }

    @Override
    public void updateImageAndNicknameMember(Long id, MemberUpdateDto updateDto) {
        Member member = memberRepository.findById(id).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        member.updateImageAndNickname(updateDto);
    }

    @Override
    public MemberGetResponseDto getMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));

        return MemberGetResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .image(member.getImage())
                .build();
    }

    @Override
    public List<MemberGetResponseDto> searchMember(String keyword) {
        List<Member> Members = memberRepository.findByNicknameContaining(keyword);
        List<MemberGetResponseDto> memberGetResponseDtoList = new ArrayList<>();
        for (Member member : Members) {
            MemberGetResponseDto memberGetResponseDto = new MemberGetResponseDto(
                    member.getId(),
                    member.getEmail(),
                    member.getNickname(),
                    member.getImage()
            );
            memberGetResponseDtoList.add(memberGetResponseDto);
        }
        return memberGetResponseDtoList;
    }

}
