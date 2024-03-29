package com.ssafy.backend.domain.song.service;

import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.entity.SongCount;
import com.ssafy.backend.domain.song.entity.SongHistory;
import com.ssafy.backend.domain.song.repository.SongCountRepository;
import com.ssafy.backend.domain.song.repository.SongHistoryRepository;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SongCountServiceImpl implements SongCountService {

    private final SongCountRepository songCountRepository;
    private final SongRepository songRepository;
    private final SongHistoryRepository songHistoryRepository;


    @Transactional
    @Scheduled(cron = "0 0 * * * *")  // 매 시간 정시마다 실행한다. (초 분 시간 일 월 요일(0,7은 일요일, 1~6은 월~토)
    public void updateSongCounts() {
        // 지난 1시간 동안의 song_history 데이터
        List<SongHistory> recentHistories = songCountRepository.findHistory();

        // song_id별로 개수 집계
        Map<Long, Long> counts = recentHistories.stream()
                .collect(Collectors.groupingBy(SongHistory::getSongId, Collectors.counting()));


        // 집계된 데이터를 song_count 테이블에 반영
        counts.forEach((songId, count) -> {
            // song_count 테이블에서 해당 song_id의 row를 찾아 count 값을 갱신
            SongCount songCount = songCountRepository.findById(songId)
                    .orElseThrow();
            songCount.setCount(songCount.getCount() + count); // 기존 값에 더함
            songCountRepository.save(songCount); // 데이터베이스 업데이트
        });

    }


}
