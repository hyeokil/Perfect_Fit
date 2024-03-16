package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.recording_movie.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
import com.ssafy.backend.domain.recording_movie.entity.Single;
import com.ssafy.backend.domain.recording_movie.service.SingleService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/single")
public class SingleController {
    private final SingleService singleService;

    // single로 부른 노래 저장
    @PostMapping("")
    public ResponseEntity<Message<Void>> createRecording(@RequestBody SingleCreateRequestDto singleCreateRequestDto) {
        singleService.createRecording(singleCreateRequestDto);
        return ResponseEntity.ok().body(Message.success());
    }

    // single로 부른 나의 노래 리스트
    // display = true로 설정되어 있는 리스트만 출력
    @GetMapping("/list/{singleId}")
    public ResponseEntity<List<Single>> getSingleRecording(@PathVariable Long singleId) {
        List<Single> recordings = singleService.getSingleRecording(singleId);
        return ResponseEntity.ok(recordings);
    }

    // single로 부른 나의 노래 영상 출력
    @GetMapping("/{singleId}/{memberId}")
    public ResponseEntity<String> getRecording(@PathVariable Long singleId, @PathVariable Long memberId) {
        String path = singleService.getRecording(singleId, memberId);
        return ResponseEntity.ok().body(path);
    }
    // 더미 데이터 생성
//    @PostMapping("/UM")
//    public ResponseEntity<Message<Void>> createRecordings() {
//        singleService.createRecordings();
//        return ResponseEntity.ok().body(Message.success());
//    }
}
