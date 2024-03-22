package com.ssafy.backend.domain.follow.repository;


import com.ssafy.backend.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFollowingIdAndFollowerId(Long followingId, Long followerId);
}
