package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.recording_movie.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Single;

import java.util.List;

public interface SingleService {

    void createRecording(SingleCreateRequestDto singleCreateRequestDto);

    List<Single> getSingleRecording(Long singleId);

    String getRecording(Long singleId, Long memberId);


    // 더미데이터 생성
//    void createRecordings();
}
