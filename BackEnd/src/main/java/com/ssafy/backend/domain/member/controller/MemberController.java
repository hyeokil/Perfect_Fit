package com.ssafy.backend.domain.member.controller;

import com.ssafy.backend.domain.member.dto.MemberGetResponseDto;
import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseDto;
import com.ssafy.backend.domain.member.dto.MemberUpdateDto;
import com.ssafy.backend.domain.member.service.MemberService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.dto.TokenDto;
import com.ssafy.backend.global.component.jwt.dto.TokenMemberInfoDto;
import com.ssafy.backend.global.component.jwt.service.JwtService;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;

    @GetMapping("/{oAuthDomain}")
    public ResponseEntity<Message<String>> provideAuthCodeRequestUrl(@PathVariable("oAuthDomain") OAuthDomain oAuthDomain) {
        String redirectUrl = memberService.provideAuthCodeRequestUrl(oAuthDomain);
        return ResponseEntity.ok().body(Message.success(redirectUrl));
    }

    @GetMapping("/{oAuthDomain}/login")
    public ResponseEntity<Message<MemberLoginResponseDto>> login(@PathVariable("oAuthDomain") OAuthDomain oAuthDomain,
                                                                 @RequestParam("code") String authCode,
                                                                 HttpServletResponse response) {
        TokenMemberInfoDto tokenMemberInfoDto = memberService.login(oAuthDomain, authCode);
        TokenDto tokenDto = jwtService.issueToken(tokenMemberInfoDto);
        MemberLoginResponseDto loginResponseDto = MemberLoginResponseDto.builder()
                .memberInfo(tokenMemberInfoDto)
                .token(tokenDto)
                .build();
        // JWT 토큰을 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("accessToken", tokenDto.getAccessToken());
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600); // 60분(3600초)으로 설정
        response.addCookie(accessTokenCookie);
        return ResponseEntity.ok().body(Message.success(loginResponseDto));
    }

    @PostMapping("/logout")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> logoutMember(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                      HttpServletResponse response) {
        memberService.logoutMember(loginActiveDto.getEmail());

        // 쿠키 삭제
        Cookie accessTokenCookie = new Cookie("accessToken", null);
        accessTokenCookie.setMaxAge(0);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);
        return ResponseEntity.ok().body(Message.success());
    }

    @PatchMapping("/update/image/nickname")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> updateImageAndNicknameMember(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                                      @RequestBody MemberUpdateDto updateDto) {
        memberService.updateImageAndNicknameMember(loginActiveDto.getId(), updateDto);
        return ResponseEntity.ok().body(Message.success());
    }

    @GetMapping("/get")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<MemberGetResponseDto>> getMember(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        MemberGetResponseDto memberGetResponseDto = memberService.getMember(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(memberGetResponseDto));
    }
}
