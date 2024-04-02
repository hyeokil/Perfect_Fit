package com.ssafy.backend.domain.reels.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.reels.dto.ReelsCreateRequestDto;
import com.ssafy.backend.domain.reels.dto.ReelsListResponseDto;
import com.ssafy.backend.domain.reels.service.ReelsService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/reels")
public class ReelsController {
    private final ReelsService reelsService;

    // 릴스 생성
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<Long>> createReels(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                     @RequestBody ReelsCreateRequestDto reelsCreateRequestDto) {
        Long reelsId = reelsService.createReels(loginActiveDto.getId(),reelsCreateRequestDto);
        return ResponseEntity.ok().body(Message.success(reelsId));
    }

    // 자신이 만든 릴스 리스트 목록
    @GetMapping("/myList")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<ReelsListResponseDto>>> getReelsList(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<ReelsListResponseDto> reels = reelsService.getMyReels(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(reels));
    }
}
