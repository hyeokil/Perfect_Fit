package com.ssafy.backend.domain.song.service;

import com.ssafy.backend.domain.song.dto.SongHistoryDto;

public interface SongHistoryService {


    // 부른 노래 기록 생성
    Long createSongHistory(Long songId, SongHistoryDto songHistoryDto);

}
