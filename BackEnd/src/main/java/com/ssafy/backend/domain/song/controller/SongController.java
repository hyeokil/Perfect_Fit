package com.ssafy.backend.domain.song.controller;

import com.ssafy.backend.domain.song.service.SongServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/song")
public class SongController {

    private final SongServiceImpl songServiceImpl;

    // MR의 정보 가져오는 요청 (Youtube data v3 API)
    @GetMapping("/searchVideo")
    public ResponseEntity<String> searchVideo() throws IOException {
        String result = songServiceImpl.getChannelVideos();
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/flo")
    public void updateSongsFlo() {
        songServiceImpl.updateSongsFlo();
    }


}
