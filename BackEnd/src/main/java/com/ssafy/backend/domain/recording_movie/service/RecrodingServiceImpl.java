package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording_movie.dto.RecordingCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
import com.ssafy.backend.domain.recording_movie.repository.RecordingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RecrodingServiceImpl implements RecordingService {

    private final RecordingRepository recordingRepository;
    private final MemberRepository memberRepository;
    @Override
    public void createRecording(RecordingCreateRequestDto createRequestDto) {

        Member single = memberRepository.findById(createRequestDto.getSingleId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid singleId"));

        Member multi = null;
        if (createRequestDto.getMultiId() != null) {
            multi = memberRepository.findById(createRequestDto.getMultiId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid multiId"));
        }
        recordingRepository.save(createRequestDto.toEntity(single, multi));

    }
}
