package com.ssafy.backend.domain.recording.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording.entity.Duet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DuetRepository extends JpaRepository<Duet, Long>, DuetRepositoryCustom {

    List<Duet> findByParticipantIsNullAndDisplayTrueOrderByCreatedAtDesc();

    List<Duet> findByUploaderAndParticipantIsNullAndDisplayTrueOrderByCreatedAtDesc(Member member);

}

