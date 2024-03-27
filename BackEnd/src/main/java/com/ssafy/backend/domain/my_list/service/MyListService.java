package com.ssafy.backend.domain.my_list.service;


import com.ssafy.backend.domain.my_list.dto.GetMyListResponseDto;

import java.util.List;

public interface MyListService {

    // 좋아요 기능 (좋아요 추가 및 좋아요 취소)
    Boolean likeSong(Long songId, Long memberId);


    // 내가 좋아요 한 노래 조회
    List<GetMyListResponseDto> getLikedSongs(Long memberId);


}
