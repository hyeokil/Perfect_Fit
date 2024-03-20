package com.ssafy.backend.domain.recording.repository;

import static com.ssafy.backend.domain.recording.entity.QDuet.duet;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class DuetRepositoryCustomImpl implements DuetRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    @Override
    public List<Duet> findDuetByMemberAndDisplayOrderByCreatedAtDesc(Member member) {
        return queryFactory.selectFrom(duet)
                .where(duet.display.isTrue()
                        .and((duet.uploader.eq(member)
                                .and(duet.participant.isNotNull()))
                                .or(duet.participant.eq(member))))
                .orderBy(duet.createdAt.desc())
                .fetch();
    }
}
