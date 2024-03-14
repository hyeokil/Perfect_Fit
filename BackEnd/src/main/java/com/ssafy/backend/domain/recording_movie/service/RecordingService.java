package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
import com.ssafy.backend.domain.recording_movie.entity.enums.MultiPlay;

import java.util.List;

public interface RecordingService {
    // 부른 노래 저장
     void createRecording(RecordingCreateRequestDto recordingCreateRequestDto);

    //     List<Recording> getAllRecording();

    // Recording의 리스트에서 MemberId로 Recording을 가져온다.
    // single, multi 관계 없이 memberId와 singleId가 일치한 모든 데이터를 출력
    List<Recording> getRecordingsByMemberId(Long singleId);

    List<Recording> getRecordingsByMemberIdAndDisplay(Long singleId);

    List<Recording> getRecordingsWhereMultiIdIsNull();

    List<Recording> getRecordingsBySingleIdAndDisplayTrueAndMultiPlayTrue(Long singleId);
}
