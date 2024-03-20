package com.ssafy.backend.domain.recording.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;

import java.util.List;

public interface DuetRepositoryCustom {
    List<Duet> findDuetByMemberAndDisplayOrderByCreatedAtDesc(Member member);
}
