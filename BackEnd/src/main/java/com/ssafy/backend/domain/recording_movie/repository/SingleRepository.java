package com.ssafy.backend.domain.recording_movie.repository;


import com.ssafy.backend.domain.recording_movie.entity.Single;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SingleRepository extends JpaRepository<Single, Long> {

    // display가 true이며 singleId가 memberId와 일치하는 값을 찾기
    List<Single> findByMemberIdAndDisplayTrue(Long memberId);

    Optional<Single> findByIdAndMemberIdAndDisplayTrue(Long singleId, Long memberId);
}
