package com.ssafy.backend.domain.recording.service;

import com.ssafy.backend.domain.recording.dto.DuetCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.DuetParticipateReqeustDto;
import com.ssafy.backend.domain.recording.entity.Duet;

import java.util.List;

public interface DuetService {

    // duet recording upload
    void createDuet(Long memberId, DuetCreateRequestDto duetCreateRequestDto);
    // duet 참여하기
    void participateDuet(Long memberId, DuetParticipateReqeustDto duetParticipateReqeustDto);

    List<Duet> getRecordingPlayer2IsNull(Long player1);

    List<Duet> getRecordingMulti(Long player1);

    List<Duet> getAllRecordingPlayer2IsNull();

    String getMultiRecording(Long multiId);
}
