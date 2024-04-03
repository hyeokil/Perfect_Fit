package com.ssafy.backend.domain.my_list.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.domain.my_list.dto.GetGenreCountDto;
import com.ssafy.backend.domain.my_list.dto.GetMyListResponseDto;
import com.ssafy.backend.domain.my_list.service.MyListService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j  // 로그를 사용하기 위한 객체를 자동으로 생성한다.
@RestController  // MVC 컨트롤러임을 나타낸다
@RequiredArgsConstructor  // final 필드에 대한 생성자를 자동으로 생성한다.
@RequestMapping("/api/v1/myList")  // 이 컨트롤러의 모든 요청은 해당 경로로 시작한다.
public class MyListController {

    private final MyListService myListService;


    // 좋아요 기능 (좋아요 추가 및 좋아요 취소)
    @PostMapping("/like/{songId}")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<Boolean>> likeSong(@PathVariable("songId") Long songId,
                                                  @AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        Boolean myListDisplay = myListService.likeSong(songId, loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(myListDisplay));
    }


    // 내가 좋아요 한 리스트 조회
    @GetMapping("/get")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<List<GetMyListResponseDto>>> getLikedSongs(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<GetMyListResponseDto> myLikedSongs = myListService.getLikedSongs(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(myLikedSongs));
    }


    // 내가 좋아요 한 노래 장르별 갯수 조회
    @GetMapping("/get/count")
    @PreAuthorize("isAuthenticated()") // 로그인 한 사용자만 접근 가능
    public ResponseEntity<Message<List<GetGenreCountDto>>> getCount(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto) {
        List<GetGenreCountDto> myLikedSongs = myListService.getCount(loginActiveDto.getId());
        return ResponseEntity.ok().body(Message.success(myLikedSongs));
    }


}
