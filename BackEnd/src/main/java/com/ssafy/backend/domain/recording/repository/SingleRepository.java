package com.ssafy.backend.domain.recording.repository;


import com.ssafy.backend.domain.recording.entity.Single;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SingleRepository extends JpaRepository<Single, Long> {

    // display가 true이며 singleId가 memberId와 일치하는 값을 찾기
    List<Single> findByMemberIdAndDisplayTrue(Long memberId);
}
