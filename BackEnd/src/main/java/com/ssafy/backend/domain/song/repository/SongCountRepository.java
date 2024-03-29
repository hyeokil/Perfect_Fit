package com.ssafy.backend.domain.song.repository;

import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.entity.SongCount;
import com.ssafy.backend.domain.song.entity.SongHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongCountRepository extends JpaRepository<SongCount, Long> {

    @Query(value = "SELECT song_id, COUNT(*) AS count FROM song_history WHERE created_at >= NOW() - INTERVAL 1 HOUR GROUP BY song_id", nativeQuery = true)
    List<SongCount> findCountByHour();

}
