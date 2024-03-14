package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Recording;

import java.util.List;

public interface RecordingService {
    // 부른 노래 저장
     void createRecording(RecordingCreateRequestDto recordingCreateRequestDto);

    //     List<Recording> getAllRecording();

    // Recording의 리스트에서 MemberId로 Recording을 가져온다.
    List<Recording> getRecordingsByMemberId(Long singleId);
}
