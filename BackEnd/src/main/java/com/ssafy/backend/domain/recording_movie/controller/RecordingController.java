package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
import com.ssafy.backend.domain.recording_movie.entity.enums.MultiPlay;
import com.ssafy.backend.domain.recording_movie.service.RecordingService;
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
@RequestMapping("/api/v1/recording")
public class RecordingController {
    private final RecordingService recordingService;

    @PostMapping("") // 자기가 부른 영상 저장 로직(display = flase값을 포함)
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> createRecording(@RequestBody RecordingCreateRequestDto recordingCreateRequestDto,
                                                         @AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
//        Long recordingId = recordingService.createRecording(recordingCreateRequestDto);
        recordingService.createRecording(recordingCreateRequestDto);

        return ResponseEntity.ok().body(Message.success());
    }

//    @GetMapping("/list") // 자신의 영상 출력 로직 (아직 모든 영상 출력하는 방식 id값 추가하여 코드 구현해야 함)
//    public ResponseEntity<List<Recording>> getAllRecording() {
//        List<Recording> recordings = recordingService.getAllRecording();
//        return ResponseEntity.ok(recordings);
//    }

    @GetMapping("/list/{singleId}") // 싱글 멀티 관계없이 내가 찍은 영상 리스트 출력(display = flase) 포함하고 있다.
    public ResponseEntity<List<Recording>> getRecordingsByMemberId(@PathVariable Long singleId) {
        List<Recording> recordings = recordingService.getRecordingsByMemberId(singleId);
        return ResponseEntity.ok(recordings);
    }

    // multi의 값이 null값인 모든 데이터 혼자 부르기와 multi 모드에서 multi_id가 null인 상태인 데이터
    // display = flase 까지 모두 출력
    @GetMapping("/multi")
    public ResponseEntity<List<Recording>> getRecordingsWhereMultiIdIsNull() {
        List<Recording> recordings = recordingService.getRecordingsWhereMultiIdIsNull();
        return ResponseEntity.ok(recordings);
    }

    // display가 true인(서버에서 false로 가지고 있는 값 제외) 자신의 모든 데이터 출력
    @GetMapping("/multi/{singleId}")
    public ResponseEntity<List<Recording>> getRecordingsByMemberIdAndDisplay(@PathVariable Long singleId) {
        List<Recording> recordings = recordingService.getRecordingsByMemberIdAndDisplay(singleId);
        return ResponseEntity.ok(recordings);
    }

    // multi 플레이이며 display가 True인 내용 출력
    // multi 모드에서 2명 모두 참여한 값 출력
    @GetMapping("/single/{singleId}")
    public ResponseEntity<List<Recording>> getRecordingsBySingleIdAndDisplayTrueAndMultiPlay(@PathVariable Long singleId) {
        List<Recording> recordings = recordingService.getRecordingsBySingleIdAndDisplayTrueAndMultiPlayTrue(singleId);
        return ResponseEntity.ok(recordings);
    }
}
