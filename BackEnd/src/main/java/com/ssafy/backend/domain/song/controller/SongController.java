package com.ssafy.backend.domain.song.controller;

import com.ssafy.backend.domain.song.dto.SongPopularChartDto;
import com.ssafy.backend.domain.song.service.SongServiceImpl;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/song")
public class SongController {

    private final SongServiceImpl songServiceImpl;


    // 인기차트100 조회
    @GetMapping("/chart/popular")
    public ResponseEntity<Message<List<SongPopularChartDto>>> getPopular100Songs(@RequestParam Long memberId) {
        List<SongPopularChartDto> result = songServiceImpl.getPopular100Songs(memberId);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 최신차트100 조회
    @GetMapping("/chart/latest")
    public ResponseEntity<Message<List<SongPopularChartDto>>> getLatest100Songs(@RequestParam Long memberId) {
        List<SongPopularChartDto> result = songServiceImpl.getLatest100Songs(memberId);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 장르차트100 조회
    @GetMapping("/chart/genre")
    public ResponseEntity<Message<List<SongPopularChartDto>>> getGenre100Songs(@RequestParam Long memberId, String genre) {
        List<SongPopularChartDto> result = songServiceImpl.getGenre100Songs(memberId, genre);
        return ResponseEntity.ok().body(Message.success(result));
    }







    // MR의 정보 가져오는 요청 (Youtube data v3 API)
    @GetMapping("/searchVideo")
    public ResponseEntity<String> searchVideo() throws IOException {
        String result = songServiceImpl.getChannelVideos();
        return ResponseEntity.ok(result);
    }

    // 나머지 노래 정보 가져오기
    @PatchMapping("/flo")
    public void updateSongsFlo() {
        songServiceImpl.updateSongsFlo();
    }


}
