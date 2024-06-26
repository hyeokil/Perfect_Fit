package com.ssafy.backend.domain.song.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.song.dto.SongChartResponseDto;
import com.ssafy.backend.domain.song.service.SongServiceImpl;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/song")
public class SongController {

    private final SongServiceImpl songServiceImpl;


    // 인기차트100 조회
    @GetMapping("/chart/popular")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<List<SongChartResponseDto>>> getPopular100Songs(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<SongChartResponseDto> result = songServiceImpl.getPopular100Songs(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 최신차트100 조회
    @GetMapping("/chart/latest")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<List<SongChartResponseDto>>> getLatest100Songs(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<SongChartResponseDto> result = songServiceImpl.getLatest100Songs(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 장르차트100 조회
    @GetMapping("/chart/genre/{genre}")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<List<SongChartResponseDto>>> getGenre100Songs(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                                                @PathVariable String genre) {
        List<SongChartResponseDto> result = songServiceImpl.getGenre100Songs(loginActiveDto.getId(), genre);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 전체차트 조회
    @GetMapping("/chart/all/{page}")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<List<SongChartResponseDto>>> getAllSongs(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                                           @PathVariable("page") int page) {
        List<SongChartResponseDto> result = songServiceImpl.getAllSongs(loginActiveDto.getId(), page, 20);
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 노래 검색
    @GetMapping("/search/{keyword}")
    public ResponseEntity<Message<List<SongChartResponseDto>>> searchSongs(@PathVariable("keyword") String keyword) {
        List<SongChartResponseDto> result = songServiceImpl.searchSongs(keyword);
        return ResponseEntity.ok().body(Message.success(result));
    }

    //  현 시간대에 많이 부른 노래 차트100 조회
    @GetMapping("/chart/current")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<SongChartResponseDto>>> findPopularSongs100ByHour(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<SongChartResponseDto> result = songServiceImpl.findPopularSongs100ByHour(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(result));
    }


    // 동요 차트 100 조회
    @GetMapping("/chart/children")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<List<SongChartResponseDto>>> findChildrenSongs100(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<SongChartResponseDto> result = songServiceImpl.findChildrenSongs100(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(result));
    }






//    // MR의 정보 가져오는 요청 (Youtube data v3 API)
//    @GetMapping("/searchVideo")
//    public ResponseEntity<String> searchVideo() throws IOException {
//        String result = songServiceImpl.getChannelVideos();
//        return ResponseEntity.ok(result);
//    }
//
//    // 나머지 노래 정보 가져오기
//    @PatchMapping("/flo")
//    public void updateSongsFlo() {
//        songServiceImpl.updateSongsFlo();
//    }


}
