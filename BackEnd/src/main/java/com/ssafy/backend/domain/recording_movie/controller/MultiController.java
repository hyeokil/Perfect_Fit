package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.recording_movie.dto.MultiCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.service.MultiService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/multi")
public class MultiController {
    private final MultiService multiService;

    // 멀티 플레이에서 영상 저장 로직
    @PostMapping("")
    public ResponseEntity<Message<Void>> createRecording(@RequestBody MultiCreateRequestDto multiCreateRequestDto) {
        multiService.createRecording(multiCreateRequestDto);
        return ResponseEntity.ok().body(Message.success());
    }
}
