package com.ssafy.backend.domain.song.service;


import com.ssafy.backend.domain.song.dto.SongChartDto;

import java.io.IOException;
import java.util.List;

public interface SongService {

    // 인기차트100 조회
    List<SongChartDto> getPopular100Songs(Long memberId);

    // 최신차트100 조회
    List<SongChartDto> getLatest100Songs(Long memberId);

    // 장르차트100 조회
    List<SongChartDto> getGenre100Songs(Long memberId, String genre);




//    // MR의 정보 가져오는 함수 (Youtube data v3 API)
//    String getChannelVideos() throws IOException;
//
//
//    // 나머지 노래 정보 가져오기
//    void updateSongsFlo();
//
//    // 문자열 정규식 사용해서 가공
//    String[] extractSongInfo(String inputData) throws IOException;

}
