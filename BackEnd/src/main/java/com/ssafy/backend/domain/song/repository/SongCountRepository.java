package com.ssafy.backend.domain.song.repository;

import com.ssafy.backend.domain.song.entity.SongCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongCountRepository extends JpaRepository<SongCount, Long> {
}
