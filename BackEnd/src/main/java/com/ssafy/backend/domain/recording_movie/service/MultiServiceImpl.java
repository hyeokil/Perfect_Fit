package com.ssafy.backend.domain.recording_movie.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording_movie.dto.MultiCreateRequestDto;
import com.ssafy.backend.domain.recording_movie.entity.Multi;
import com.ssafy.backend.domain.recording_movie.entity.Single;
import com.ssafy.backend.domain.recording_movie.repository.MultiRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MultiServiceImpl implements MultiService{
    private final MultiRepository multiRepository;
    private final MemberRepository memberRepository;

    // 멀티 플레이에서의 영상 저장 로직
//    @Override
//    public void createRecording(MultiCreateRequestDto multiCreateRequestDto) {
//        // player1에 해당하는 id값 찾는 로직
//        // 이미 player1에 값이 있으면 -> 밑에 로직이 player2로 가게 만들려고 하는거지
//
//
//        Member player1 = memberRepository.findById(multiCreateRequestDto.getPlayer1())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid player1"));
//
//        // player2에 해당하는 id값 찾는 로직
//        // player2가 아직 노래를 부르지 않았을 수도 있으므로 null값 허용
//        Member player2 = null;
//        if (multiCreateRequestDto.getPlayer2() != null) {
//            player2 = memberRepository.findById(multiCreateRequestDto.getPlayer2())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid player2"));
//        }
//
//        multiRepository.save(multiCreateRequestDto.toEntity(player1, player2));
//    }

    // 영상 저장 로직
    // player1이 없는 경우 현재 로그인된 memeberId가 player1이 되도록
    // player1이 있는 경우 player2가 현재 로그인된 memberId가 되도록
    // 아직 검증이 완료되지 않음
    @Override
    public void createRecording(MultiCreateRequestDto multiCreateRequestDto) {
        // player1에 해당하는 id값 찾는 로직
        // 이미 player1에 값이 있으면 -> 밑에 로직이 player2로 가게 만들려고 하는거지

        Member player1;
        Member player2 = null;
        if (multiCreateRequestDto.getPlayer1() != null) {
            player1 = memberRepository.findById(multiCreateRequestDto.getPlayer1())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid player1 Id"));

            player2 = memberRepository.findById(multiCreateRequestDto.getPlayer2())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid player2 Id"));
        } else {
            player1 = memberRepository.findById(multiCreateRequestDto.getPlayer1())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid player1 Id"));
        }
        multiRepository.save(multiCreateRequestDto.toEntity(player1, player2));
    }

    //더미 데이터 생성
    @Override
    public void createRecordings(){
        Member P1 = memberRepository.findById(1L).orElseThrow();
        Member P2 = memberRepository.findById(2L).orElseThrow();
        for (int i = 0; i < 10000; i++) {
            multiRepository.save(Multi.builder().player1(P1).player2(P2).path("www").display(true).build());
            multiRepository.save(Multi.builder().player1(P1).player2(P1).path("aaaa").display(true).build());
        }
    }

    @Override
    public List<Multi> getRecordingPlayer2IsNull(Long player1) {
        return multiRepository.findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNull(player1);
    }

    @Override
    public List<Multi> getRecordingMulti(Long player1) {
        List<Multi> list1 = multiRepository.findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNotNull(player1);
        List<Multi> list2 = multiRepository.findByPlayer2IdAndDisplayTrue(player1);
        List<Multi> playlist = Stream.of(list1, list2)
                .flatMap(Collection::stream)
                .toList();
//        List<Multi> playlist = new ArrayList<>();
//        playlist.addAll(list1);
//        playlist.addAll(list2);
        return playlist;
    }

    @Override
    public List<Multi> getAllRecordingPlayer2IsNull(){
        return multiRepository.findByDisplayTrueAndPlayer2IdIsNull();
    }

    @Override
    public String getMultiRecording(Long multiId) {
        return multiRepository.findByIdAndDisplayTrue(multiId)
                .map(Multi::getPath)
                .orElseThrow(() -> new EntityNotFoundException("Single not found"));
    }
}
