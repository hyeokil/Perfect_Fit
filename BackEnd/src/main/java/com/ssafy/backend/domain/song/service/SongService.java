package com.ssafy.backend.domain.song.service;


import java.io.IOException;

public interface SongService {

    // MR의 정보 가져오는 함수 (Youtube data v3 API)
    String getChannelVideos() throws IOException;

    void updateSongsFlo();

    // 문자열 정규식 사용해서 가공
    String[] extractSongInfo(String inputData) throws IOException;

}
