package com.ssafy.backend.domain.reels.repository;

import com.ssafy.backend.domain.reels.entity.Reels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelsRepository  extends JpaRepository<Reels, Long> {

    List<Reels> findByMemberId(Long memberId);

}
