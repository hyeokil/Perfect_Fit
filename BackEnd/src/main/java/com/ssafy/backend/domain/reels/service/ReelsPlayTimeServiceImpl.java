package com.ssafy.backend.domain.reels.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.reels.dto.ReelsPlayTimeRequestDto;
import com.ssafy.backend.domain.reels.repository.ReelsPlayTimeRepository;
import com.ssafy.backend.domain.reels.repository.ReelsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReelsPlayTimeServiceImpl implements ReelsPlayTimeService{

    private final MemberRepository memberRepository;
    private final ReelsRepository reelsRepository;
    private final ReelsPlayTimeRepository reelsPlayTimeRepository;


    @Override
    public void createBulkPlayTime(Long memberId, List<ReelsPlayTimeRequestDto> reelsPlayTimeRequestDtoList) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        for (ReelsPlayTimeRequestDto reelsPlayTimeRequestDto : reelsPlayTimeRequestDtoList) {
            reelsPlayTimeRepository.save(reelsPlayTimeRequestDto.toEntity(memberId));
        }
    }

}
