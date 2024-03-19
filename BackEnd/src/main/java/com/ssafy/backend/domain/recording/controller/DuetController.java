package com.ssafy.backend.domain.recording.controller;

import com.ssafy.backend.domain.recording.entity.Multi;
import com.ssafy.backend.domain.recording.service.DuetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/multi")
public class DuetController {
    private final DuetService multiService;

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

    // display가 true이며 아직 듀엣이 완성되지 않은 player1만 노래를 부른 데이터 출력
    // player2의 값이 null값인 데이터 출력
    // 나의 노래만 볼 수 있음
    @GetMapping("/{player1}")
    public ResponseEntity<List<Multi>> getRecordingPlayer2IsNull(@PathVariable Long player1) {
        List<Multi> multi = multiService.getRecordingPlayer2IsNull(player1);
        return ResponseEntity.ok(multi);
    }

    // 영상을 볼 수 있는 get 요청
     @GetMapping("/record/{multiId}")
    public ResponseEntity<String> getMultiRecording(@PathVariable Long multiId) {
         String path = multiService.getMultiRecording(multiId);
         return ResponseEntity.ok().body(path);
    }

    // 듀엣이 완성된 값을 출력

    @GetMapping("/list/{playerId}")
    public ResponseEntity<List<Multi>> getRecordingMulti(@PathVariable Long playerId) {
        List<Multi> multi = multiService.getRecordingMulti(playerId);
        return ResponseEntity.ok(multi);
    }

    // 모든 player2가 없는 노래를 출력해야 함.
    // @GetMapping(/list)
    @GetMapping("/list")
    public ResponseEntity<List<Multi>> getAllRecordingPlayer2IsNull(){
        List<Multi> multi = multiService.getAllRecordingPlayer2IsNull();
        return ResponseEntity.ok(multi);
    }
}
