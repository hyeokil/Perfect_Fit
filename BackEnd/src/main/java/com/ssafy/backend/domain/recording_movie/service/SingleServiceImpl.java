package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording_movie.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.repository.SingleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SingleServiceImpl implements SingleService{

    private final SingleRepository singleRepository;
    private final MemberRepository memberRepository;

    @Override
    public void createRecording(SingleCreateRequestDto singleCreateRequestDto) {
        Member single = memberRepository.findById(singleCreateRequestDto.getSingleId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid multiId"));
        singleRepository.save(singleCreateRequestDto.toEntity(single));
    }

}
