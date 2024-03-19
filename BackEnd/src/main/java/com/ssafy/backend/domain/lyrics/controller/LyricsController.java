package com.ssafy.backend.domain.lyrics.controller;

import com.ssafy.backend.domain.lyrics.service.LyricsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/lyrics")
public class LyricsController {

    private final LyricsServiceImpl lyricsService;


    @GetMapping("/update")
    public String updateLyrics() throws Exception {
        lyricsService.updateLyricsAllSongs();
        return "가사 업데이트 완료 !";
    }


}
