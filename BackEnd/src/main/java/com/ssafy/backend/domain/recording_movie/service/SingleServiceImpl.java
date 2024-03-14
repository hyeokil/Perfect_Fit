package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording_movie.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Single;
import com.ssafy.backend.domain.recording_movie.repository.SingleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SingleServiceImpl implements SingleService{

    private final SingleRepository singleRepository;
    private final MemberRepository memberRepository;

    //
    @Override
    public void createRecording(SingleCreateRequestDto singleCreateRequestDto) {
        // singleCreateRequestDto에서 제공된 singleId에 해당하는 Member엔터티를 db에서 조회
        Member single = memberRepository.findById(singleCreateRequestDto.getSingleId())
                // singleId에 해당하는 Member가 없을 경우 예외 표시
                .orElseThrow(() -> new IllegalArgumentException("Invalid singleId"));
        singleRepository.save(singleCreateRequestDto.toEntity(single));
    }

    // single모드로 부른 노래 조회
    @Override
    public List<Single> getSingleRecording(Long singleId) {
        return singleRepository.findBySingleIdAndDisplayTrue(singleId);
    }
}
