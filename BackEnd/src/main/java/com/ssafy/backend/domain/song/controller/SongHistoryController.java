package com.ssafy.backend.domain.song.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.song.service.SongHistoryService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/song/history")
public class SongHistoryController {

    private final SongHistoryService songHistoryService;


    // 부른 노래 기록 생성
    @PostMapping("/{songId}")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<Void>> createSongHistory(@PathVariable("songId") Long songId,
                                                           @AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        songHistoryService.createSongHistory(songId, loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success());
    }

}
