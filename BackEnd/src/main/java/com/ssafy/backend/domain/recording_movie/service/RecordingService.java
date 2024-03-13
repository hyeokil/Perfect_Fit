package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;

public interface RecordingService {
    // 부른 노래 저장
     void createRecording(RecordingCreateRequestDto recordingCreateRequestDto);


}
