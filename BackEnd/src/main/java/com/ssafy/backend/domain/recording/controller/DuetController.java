package com.ssafy.backend.domain.recording.controller;


import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording.dto.DuetCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.DuetFinishedListResponseDto;
import com.ssafy.backend.domain.recording.dto.DuetListResponseDto;
import com.ssafy.backend.domain.recording.dto.DuetParticipateReqeustDto;
import com.ssafy.backend.domain.recording.service.DuetService;
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
@RequestMapping("/api/v1/duet")
public class DuetController {

    private final DuetService duetService;

    // duet으로 부른 노래 upload
    @PostMapping("/create/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Void>> createDuet(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                    @RequestBody DuetCreateRequestDto duetCreateRequestDto,
                                                    @PathVariable("songId") Long songId) {
        duetService.createDuet(loginActiveDto.getId(), songId, duetCreateRequestDto);
        return ResponseEntity.ok().body(Message.success());
    }

    // duet 참여하기
    @PostMapping("/participate/{songId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Void>> participateDuet(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                         @RequestBody DuetParticipateReqeustDto duetParticipateReqeustDto,
                                                         @PathVariable("songId") Long songId) {
        duetService.participateDuet(loginActiveDto.getId(), songId, duetParticipateReqeustDto);
        return ResponseEntity.ok().body(Message.success());
    }


    // 완성안된 모든 duet 조회
    @GetMapping("/unfinished/list")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<DuetListResponseDto>>> getAllDuetList() {
        List<DuetListResponseDto> duetList = duetService.getAllDuetList();
        return ResponseEntity.ok().body(Message.success(duetList));
    }

    // 완성안된 내 duet list 조회
    @GetMapping("/unfinished/myList")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<DuetListResponseDto>>>  getMyDuetList(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<DuetListResponseDto> myDuetList = duetService.getMyDuetList(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(myDuetList));
    }

    // 완성된 내 duet list 조회 업로더 참여자 모두
    @GetMapping("/finished/myList")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<DuetFinishedListResponseDto>>>  getMyDuetFinishedList(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<DuetFinishedListResponseDto> myDuetFinishedList = duetService.getMyDuetFinishedList(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(myDuetFinishedList));
    }

    // 단일 조회
    @GetMapping("/get/{duetId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<DuetFinishedListResponseDto>>  getDuet(@PathVariable("duetId") Long duetId) {
        DuetFinishedListResponseDto myDuet = duetService.getDuet(duetId);
        return ResponseEntity.ok().body(Message.success(myDuet));
    }

}
