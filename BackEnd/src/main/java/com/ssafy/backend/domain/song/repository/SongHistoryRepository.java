package com.ssafy.backend.domain.song.repository;

import com.ssafy.backend.domain.song.entity.SongHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongHistoryRepository extends JpaRepository<SongHistory, Long> {

}
