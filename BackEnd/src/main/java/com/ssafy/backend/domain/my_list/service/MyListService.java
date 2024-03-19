package com.ssafy.backend.domain.my_list.service;


import com.ssafy.backend.domain.my_list.dto.MyListGetMyLikeSongDto;
import com.ssafy.backend.domain.my_list.dto.MyListLikeSongDto;

import java.util.List;

public interface MyListService {

    // 좋아요 기능 (좋아요 추가 및 좋아요 취소)
    Long likeSong(Long songId, MyListLikeSongDto myListLikeSongDto);


    // 내가 좋아요 한 노래 조회
    List<MyListGetMyLikeSongDto> getLikedSongs(MyListGetMyLikeSongDto myListGetMyLikeSongDto);


}
