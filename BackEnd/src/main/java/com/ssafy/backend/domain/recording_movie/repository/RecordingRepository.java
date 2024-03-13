package com.ssafy.backend.domain.recording_movie.repository;

import com.ssafy.backend.domain.recording_movie.entity.Recording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RecordingRepository extends JpaRepository<Recording, Long> {
    // 기본적인 CRUD JPA에서 제공

}
