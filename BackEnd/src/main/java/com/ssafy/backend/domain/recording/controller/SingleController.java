package com.ssafy.backend.domain.recording.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.SingleResponseDto;
import com.ssafy.backend.domain.recording.service.SingleService;
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
@RequestMapping("/api/v1/single")
public class SingleController {
    private final SingleService singleService;

    // single로 부른 노래 저장
    @PostMapping("/create/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Void>> createSingle(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                      @RequestBody SingleCreateRequestDto singleCreateRequestDto,
                                                      @PathVariable("songId") Long songId) {
        singleService.createSingle(loginActiveDto.getId(), songId, singleCreateRequestDto);
        return ResponseEntity.ok().body(Message.success());
    }

    // single로 부른 나의 노래 리스트
    // display = true로 설정되어 있는 리스트만 출력
    @GetMapping("/list")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<SingleResponseDto>>> getRecordingList(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<SingleResponseDto> singleList = singleService.getSingleList(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(singleList));
    }

}
