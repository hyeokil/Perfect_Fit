package com.ssafy.backend.domain.follow.service;

import com.ssafy.backend.domain.follow.entity.Follow;
import com.ssafy.backend.domain.follow.exception.FollowError;
import com.ssafy.backend.domain.follow.exception.FollowException;
import com.ssafy.backend.domain.follow.repository.FollowRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    @Override
    public boolean updateFollow(Long followingId, Long followerId) {
        if (followerId.equals(followingId)) {
            throw new FollowException(FollowError.CANNOT_FOLLOW_SELF);
        }
        memberRepository.findById(followerId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Follow follow = followRepository.findByFollowingIdAndFollowerId(followingId, followerId);
        if (follow == null) {
            follow = Follow.builder()
                    .followingId(followingId)
                    .followerId(followerId)
                    .active(true)
                    .build();
        } else {
            follow.updateActive();
        }
        followRepository.save(follow);

        return follow.isActive();
    }

}
