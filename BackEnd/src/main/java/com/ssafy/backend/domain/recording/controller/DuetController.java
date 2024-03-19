package com.ssafy.backend.domain.recording.controller;


import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording.dto.DuetCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.DuetListResponseDto;
import com.ssafy.backend.domain.recording.dto.DuetParticipateReqeustDto;
import com.ssafy.backend.domain.recording.entity.Duet;
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
    @PostMapping("/create")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Void>> createDuet(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                      @RequestBody DuetCreateRequestDto duetCreateRequestDto) {
        duetService.createDuet(loginActiveDto.getId(), duetCreateRequestDto);
        return ResponseEntity.ok().body(Message.success());
    }

    // duet 참여하기
    @PostMapping("/participate")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Void>> participateDuet(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                    @RequestBody DuetParticipateReqeustDto duetParticipateReqeustDto) {
        duetService.participateDuet(loginActiveDto.getId(), duetParticipateReqeustDto);
        return ResponseEntity.ok().body(Message.success());
    }


    // 완성안된 모든 duet 조회
    @GetMapping("/list")
    public ResponseEntity<Message<List<DuetListResponseDto>>> getAllDuetList() {
        List<DuetListResponseDto> duetList = duetService.getAllDuetList();
        return ResponseEntity.ok().body(Message.success(duetList));
    }

    // 완성안된 내 duet list 조회
    @GetMapping("/myList")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<DuetListResponseDto>>>  getMyDuetList(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<DuetListResponseDto> myDuetList = duetService.getMyDuetList(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(myDuetList));
    }


    // 듀엣이 완성된 값을 출력

    @GetMapping("/list/{playerId}")
    public ResponseEntity<List<Duet>> getRecordingMulti(@PathVariable Long playerId) {
        List<Duet> multi = duetService.getRecordingMulti(playerId);
        return ResponseEntity.ok(multi);
    }

    // 멀티 플레이에서 영상 저장 로직
//    @PostMapping("")
//    public ResponseEntity<Message<Void>> createRecording(@RequestBody MultiCreateRequestDto multiCreateRequestDto) {
//        multiService.createRecording(multiCreateRequestDto);
//        return ResponseEntity.ok().body(Message.success());
//    }

//     더미 데이터 생성
//    @PostMapping("/UM")
//    public ResponseEntity<Message<Void>> createRecordings() {
//        multiService.createRecordings();
//        return ResponseEntity.ok().body(Message.success());
//    }

}
