package com.ssafy.backend.domain.recording.service;

import com.ssafy.backend.domain.recording.dto.SingleCreateRequestDto;

import com.ssafy.backend.domain.recording.entity.Single;

import java.util.List;

public interface SingleService {

    //single recording 저장
    void createRecording(Long memberId, SingleCreateRequestDto singleCreateRequestDto);

    List<Single> getSingleRecording(Long singleId);

    String getRecording(Long singleId, Long memberId);


    // 더미데이터 생성
//    void createRecordings();
}
