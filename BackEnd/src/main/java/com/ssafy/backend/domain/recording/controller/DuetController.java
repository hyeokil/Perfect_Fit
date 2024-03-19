package com.ssafy.backend.domain.recording.controller;


import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording.dto.DuetCreateRequestDto;
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



    // display가 true이며 아직 듀엣이 완성되지 않은 player1만 노래를 부른 데이터 출력
    // player2의 값이 null값인 데이터 출력
    // 나의 노래만 볼 수 있음
    @GetMapping("/{player1}")
    public ResponseEntity<Message<List<Duet>>> getRecordingPlayer2IsNull(@PathVariable Long player1) {
        List<Duet> multi = duetService.getRecordingPlayer2IsNull(player1);
        return ResponseEntity.ok().body(Message.success(multi));
    }

    // 영상을 볼 수 있는 get 요청
    @GetMapping("/record/{multiId}")
    public ResponseEntity<String> getMultiRecording(@PathVariable Long multiId) {
         String path = duetService.getMultiRecording(multiId);
         return ResponseEntity.ok().body(path);
    }

    // 듀엣이 완성된 값을 출력

    @GetMapping("/list/{playerId}")
    public ResponseEntity<List<Duet>> getRecordingMulti(@PathVariable Long playerId) {
        List<Duet> multi = duetService.getRecordingMulti(playerId);
        return ResponseEntity.ok(multi);
    }

    // 모든 player2가 없는 노래를 출력해야 함.
    // @GetMapping(/list)
    @GetMapping("/list")
    public ResponseEntity<List<Duet>> getAllRecordingPlayer2IsNull(){
        List<Duet> multi = duetService.getAllRecordingPlayer2IsNull();
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
