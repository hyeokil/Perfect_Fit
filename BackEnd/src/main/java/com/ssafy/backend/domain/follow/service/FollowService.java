package com.ssafy.backend.domain.follow.service;


public interface FollowService {

    boolean updateFollow(Long followingId, Long followerId);

}
