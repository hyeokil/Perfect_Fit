package com.ssafy.backend.domain.song.service;

public interface SongHistoryService {


    // 부른 노래 기록 생성
    void createSongHistory(Long songId, Long memberId);

}
