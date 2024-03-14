package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.recording_movie.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.service.SingleService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/single")
public class SingleController {
    private final SingleService singleService;

    @PostMapping("")
    public ResponseEntity<Message<Void>> createRecording(@RequestBody SingleCreateRequestDto singleCreateRequestDto) {
        singleService.createRecording(singleCreateRequestDto);
        return ResponseEntity.ok().body(Message.success());
    }
}
