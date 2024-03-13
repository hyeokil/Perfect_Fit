package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.service.RecordingService;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/recording")
public class RecordingController {
    private final RecordingService recordingService;
    @PostMapping("")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> createRecording(@RequestBody RecordingCreateRequestDto recordingCreateRequestDto,
                                                         @AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
//        Long recordingId = recordingService.createRecording(recordingCreateRequestDto);
        recordingService.createRecording(recordingCreateRequestDto);

        return ResponseEntity.ok().body(Message.success());
    }
}
