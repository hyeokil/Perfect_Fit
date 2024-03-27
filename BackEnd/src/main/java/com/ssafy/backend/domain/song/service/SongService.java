package com.ssafy.backend.domain.song.service;


import com.ssafy.backend.domain.song.dto.SongChartResponseDto;

import java.util.List;

public interface SongService {

    // 인기차트100 조회
    List<SongChartResponseDto> getPopular100Songs(Long memberId);

    // 최신차트100 조회
    List<SongChartResponseDto> getLatest100Songs(Long memberId);

    // 장르차트100 조회
    List<SongChartResponseDto> getGenre100Songs(Long memberId, String genre);

    // 전체 차트 조회
    List<SongChartResponseDto> getAllSongs(Long memberId, int pageSize, int page);

    // 노래 검색
    List<SongChartResponseDto> searchSongs(String keyword);

    //  현 시간대에 많이 부른 노래 차트100 조회
    List<SongChartResponseDto> findPopularSongs100ByHour(Long memberId);


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
