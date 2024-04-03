package com.ssafy.backend.domain.lyrics.controller;

import com.ssafy.backend.domain.lyrics.dto.LyricsResponseDto;
import com.ssafy.backend.domain.lyrics.service.LyricsService;
import com.ssafy.backend.domain.lyrics.service.LyricsServiceImpl;
import com.ssafy.backend.domain.song.dto.SongChartResponseDto;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/lyrics")
public class LyricsController {

    private final LyricsService lyricsService;

    @GetMapping("/{songId}")
    public ResponseEntity<Message<List<LyricsResponseDto>>> getLyrics(@PathVariable("songId") Long songId) {
        List<LyricsResponseDto> result = lyricsService.getLyrics(songId);
        return ResponseEntity.ok().body(Message.success(result));
    }


    @GetMapping("/update")
    public String updateLyrics() throws Exception {
        lyricsService.updateLyricsAllSongs();
        return "가사 업데이트 완료 !";
    }


}
