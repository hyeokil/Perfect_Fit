package com.ssafy.backend.domain.recording_movie.repository;


import com.ssafy.backend.domain.recording_movie.entity.Recording;
import com.ssafy.backend.domain.recording_movie.entity.enums.MultiPlay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RecordingRepository extends JpaRepository<Recording, Long> {
    // 기본적인 CRUD JPA에서 제공

    // SingId가 memberId와 일치하는 값을 출력
    List<Recording> findBySingleId(Long singleId);

    // multiId가 null인 Recording 조회
    List<Recording> findByMultiIsNull();

    List<Recording> findBySingleIdAndDisplayTrue(Long singleId);

    List<Recording> findBySingleIdAndDisplayTrueAndMultiPlayTrue(Long singleId);

}
