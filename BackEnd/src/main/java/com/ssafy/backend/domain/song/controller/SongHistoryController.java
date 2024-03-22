package com.ssafy.backend.domain.song.controller;

import com.ssafy.backend.domain.my_list.dto.MyListLikeSongDto;
import com.ssafy.backend.domain.song.dto.SongHistoryDto;
import com.ssafy.backend.domain.song.service.SongHistoryServiceImpl;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/song/history")
public class SongHistoryController {

    private final SongHistoryServiceImpl songHistoryService;


    // 부른 노래 기록 생성
    @PostMapping("/{songId}")
    public ResponseEntity<Message<Long>> createSongHistory(@PathVariable("songId") Long songId,
                                                            @RequestBody SongHistoryDto songHistoryDto) {
        Long songHistoryId = songHistoryService.createSongHistory(songId, songHistoryDto);
        return ResponseEntity.ok().body(Message.success(songHistoryId));
    }


}
