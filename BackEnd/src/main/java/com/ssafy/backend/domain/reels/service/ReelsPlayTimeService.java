package com.ssafy.backend.domain.reels.service;

import com.ssafy.backend.domain.reels.dto.ReelsPlayTimeRequestDto;

import java.util.List;

public interface ReelsPlayTimeService {


    void createBulkPlayTime(Long memberId, List<ReelsPlayTimeRequestDto> reelsPlayTimeRequestDtoList);
}
