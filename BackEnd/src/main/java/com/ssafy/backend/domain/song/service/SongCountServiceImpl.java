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

import java.math.BigInteger;
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


    @Scheduled(cron = "0 20 * * * *")  // 매 시간 정시마다 실행한다. (초 분 시간 일 월 요일(0,7은 일요일, 1~6은 월~토)
    public void updateSongCounts() {
        // 지난 1시간 동안의 song_history 데이터
        List<SongCount> recentCounts = songCountRepository.findCountByHour();

//        // recentCounts에서 count 값을 모두 합산 후 출력
//        long total = recentCounts.stream()
//                .mapToLong(SongCount::getCount)
//                .sum();
//        System.out.println("Total count in the last hour: " + total);

        // 조회된 결과를 반복하여 처리
        for (SongCount recentCount : recentCounts) {
            // song_count 테이블에서 해당 song_id에 대한 레코드 조회
            SongCount existingCount = songCountRepository.findById(recentCount.getSongId()).orElseThrow();

            // 새로운 count 값을 기존 값에 가산 (여기서 문제가 되는 부분이다)
            existingCount.setCount(existingCount.getCount() + recentCount.getCount());


//            songCountRepository.save(existingCount);



        }
    }


}
