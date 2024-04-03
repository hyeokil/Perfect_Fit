package com.ssafy.backend.domain.lyrics.repository;

import com.ssafy.backend.domain.lyrics.entity.Lyrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LyricsRepository extends JpaRepository<Lyrics, Long> {


    boolean existsBySongId(Long songId);
}
