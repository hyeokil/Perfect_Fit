package com.ssafy.backend.domain.reels.service;

import com.ssafy.backend.domain.reels.dto.ReelsCreateRequestDto;
import com.ssafy.backend.domain.reels.dto.ReelsListResponseDto;

import java.util.List;

public interface ReelsService {
    Long createReels(Long memberId, ReelsCreateRequestDto reelsCreateRequestDto);

    List<ReelsListResponseDto> getMyReels(Long memberId);


}
