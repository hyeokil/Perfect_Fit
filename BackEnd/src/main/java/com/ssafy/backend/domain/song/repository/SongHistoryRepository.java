package com.ssafy.backend.domain.song.repository;

import com.ssafy.backend.domain.song.entity.SongHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Repository
public interface SongHistoryRepository extends JpaRepository<SongHistory, Long> {

//    @Query(value = "SELECT * FROM song_history WHERE created_at >= NOW() - INTERVAL 1 HOUR", nativeQuery = true)
//    List<SongHistory> findHistory();

}
