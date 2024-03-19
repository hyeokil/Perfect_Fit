package com.ssafy.backend.domain.recording.service;

import com.ssafy.backend.domain.recording.entity.Duet;

import java.util.List;

public interface DuetService {

    // MultiCreateRequestDto에 해당하는 값을 받아 영상 저장하기 위한 로직
//    void createRecording(MultiCreateRequestDto multiCreateRequestDto);

//    void createRecordings();

    List<Duet> getRecordingPlayer2IsNull(Long player1);

    List<Duet> getRecordingMulti(Long player1);

    List<Duet> getAllRecordingPlayer2IsNull();

    String getMultiRecording(Long multiId);
}
