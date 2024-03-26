package com.ssafy.backend.domain.reels.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.reels.dto.ReelsPlayTimeRequestDto;
import com.ssafy.backend.domain.reels.service.ReelsPlayTimeService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/PlayTime")
public class ReelsPlayTimeController {
    private final ReelsPlayTimeService reelsPlayTimeService;

    @PostMapping("/createBulk")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Void>> createBulkPlayTime(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                            @RequestBody List<ReelsPlayTimeRequestDto> reelsPlayTimeRequestDtoList) {
        reelsPlayTimeService.createBulkPlayTime(loginActiveDto.getId(), reelsPlayTimeRequestDtoList);
        return ResponseEntity.ok().body(Message.success());
    }
}
