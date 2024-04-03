package com.ssafy.backend.domain.lyrics.service;

import com.ssafy.backend.domain.lyrics.dto.LyricsResponseDto;

import java.util.List;

public interface LyricsService {

    List<LyricsResponseDto> getLyrics(Long songId);

    void updateLyricsAllSongs();


}
