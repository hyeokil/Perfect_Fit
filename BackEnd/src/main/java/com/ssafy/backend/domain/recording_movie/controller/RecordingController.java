package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
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

    @PostMapping("") // 자기가 부른 영상 저장 로직
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

    @GetMapping("/list/{singleId}")
    public ResponseEntity<List<Recording>> getRecordingsByMemberId(@PathVariable Long singleId) {
        List<Recording> recordings = recordingService.getRecordingsByMemberId(singleId);
        return ResponseEntity.ok(recordings);
    }
}
