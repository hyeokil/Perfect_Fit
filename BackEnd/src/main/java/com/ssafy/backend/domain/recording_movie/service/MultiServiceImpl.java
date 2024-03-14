package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording_movie.dto.MultiCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Multi;
import com.ssafy.backend.domain.recording_movie.repository.MultiRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MultiServiceImpl implements MultiService{
    private final MultiRepository multiRepository;
    private final MemberRepository memberRepository;

    // 멀티 플레이에서의 영상 저장 로직
    @Override
    public void createRecording(MultiCreateRequestDto multiCreateRequestDto) {
        // player1에 해당하는 id값 찾는 로직
        Member player1 = memberRepository.findById(multiCreateRequestDto.getPlayer1())
                .orElseThrow(() -> new IllegalArgumentException("Invalid player1"));

        // player2에 해당하는 id값 찾는 로직
        // player2가 아직 노래를 부르지 않았을 수도 있으므로 null값 허용
        Member player2 = null;
        if (multiCreateRequestDto.getPlayer2() != null) {
            player2 = memberRepository.findById(multiCreateRequestDto.getPlayer2())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid player2"));
        }

        multiRepository.save(multiCreateRequestDto.toEntity(player1, player2));
    }

    @Override
    public List<Multi> getRecordingPlayer2IsNull(Long player1) {
        return multiRepository.findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNull(player1);
    }

    @Override
    public List<Multi> getRecordingMulti(Long player1, Long player2) {
        return multiRepository.findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNotNull(player1);
    }
}
