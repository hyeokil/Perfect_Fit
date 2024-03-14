package com.ssafy.backend.domain.recording_movie.controller;

import com.ssafy.backend.domain.recording_movie.dto.MultiCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Multi;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
import com.ssafy.backend.domain.recording_movie.service.MultiService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // display가 true이며 아직 듀엣이 완성되지 않은 player1만 노래를 부른 데이터 출력
    // player2의 값이 null값인 데이터 출력
    @GetMapping("/{player1}")
    public ResponseEntity<List<Multi>> getRecordingPlayer2IsNull(@PathVariable Long player1) {
        List<Multi> multi = multiService.getRecordingPlayer2IsNull(player1);
        return ResponseEntity.ok(multi);
    }

    // 듀엣이 완성된 값을 출력
    // 아직은 player1의 값으로만 검색 가능
    // 나중에 부른 사람은 볼 수 없는 코드...
    // 생각을 해보면 player1과 player2의 id값중 큰 값을 찾고 api를 작은 값 먼저, 큰 값 나중에 참조 하는 코드를 만들면 가능할지도?
    @GetMapping("/list/{player1}")
    public ResponseEntity<List<Multi>> getRecordingMulti(@PathVariable Long player1, Long player2) {
        List<Multi> multi = multiService.getRecordingMulti(player1, player2);
        return ResponseEntity.ok(multi);
    }
}
