package com.ssafy.backend.domain.my_list.controller;

import com.ssafy.backend.domain.my_list.dto.MyListGetMyLikeSongDto;
import com.ssafy.backend.domain.my_list.dto.MyListLikeSongDto;
import com.ssafy.backend.domain.my_list.service.MyListService;
import com.ssafy.backend.global.common.dto.Message;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j  // 로그를 사용하기 위한 객체를 자동으로 생성한다.
@RestController  // MVC 컨트롤러임을 나타낸다
@RequiredArgsConstructor  // final 필드에 대한 생성자를 자동으로 생성한다.
@RequestMapping("/api/v1/mylist")  // 이 컨트롤러의 모든 요청은 해당 경로로 시작한다.
public class MyListController {

    private final MyListService myListService;


    // 좋아요 기능 (좋아요 추가 및 좋아요 취소)
    @PostMapping("/like/{songId}")
    public ResponseEntity<Message<Long>> likeSong(@PathVariable("songId") Long songId,
                                                  @RequestBody MyListLikeSongDto myListLikeSongDto) {
        Long myListId = myListService.likeSong(songId, myListLikeSongDto);
        return ResponseEntity.ok().body(Message.success(myListId));
    }


    // 내가 좋아요 한 리스트 조회
    @GetMapping("/get")
    public ResponseEntity<Message<List<MyListGetMyLikeSongDto>>> getLikedSongs(@RequestBody MyListGetMyLikeSongDto myListGetMyLikeSongDto) {
        List<MyListGetMyLikeSongDto> myLikedSongs = myListService.getLikedSongs(myListGetMyLikeSongDto);
        return ResponseEntity.ok().body(Message.success(myLikedSongs));
    }


}
