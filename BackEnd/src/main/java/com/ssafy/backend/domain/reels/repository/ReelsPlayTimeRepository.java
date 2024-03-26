package com.ssafy.backend.domain.reels.repository;

import com.ssafy.backend.domain.reels.entity.ReelsPlayTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReelsPlayTimeRepository extends JpaRepository<ReelsPlayTime, Long> {
    List<ReelsPlayTime> findByMemberIdAndReelsId(Long memberId, Long ReelsId);
}
