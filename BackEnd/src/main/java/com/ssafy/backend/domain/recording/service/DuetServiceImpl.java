package com.ssafy.backend.domain.recording.service;


import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording.dto.DuetCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.DuetListResponseDto;
import com.ssafy.backend.domain.recording.dto.DuetParticipateReqeustDto;
import com.ssafy.backend.domain.recording.entity.Duet;
import com.ssafy.backend.domain.recording.repository.DuetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class DuetServiceImpl implements DuetService {

    private final DuetRepository duetRepository;
    private final MemberRepository memberRepository;

    // duet upload
    @Override
    public void createDuet(Long memberId, DuetCreateRequestDto duetCreateRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        duetRepository.save(duetCreateRequestDto.toEntity(member));
    }

    // duet participate
    @Override
    public void participateDuet(Long memberId, DuetParticipateReqeustDto duetParticipateReqeustDto) {
        Member uploader = memberRepository.findById(duetParticipateReqeustDto.getUploaderId()).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Member participant = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        duetRepository.save(duetParticipateReqeustDto.toEntity(uploader, participant));
    }
    // 완성안된 모든 duet 조회
    @Override
    public List<DuetListResponseDto> getAllDuetList() {
        List<Duet> duets = duetRepository.findByParticipantIsNullAndDisplayTrueOrderByCreatedAtDesc();
        List<DuetListResponseDto> duetListResponseDtoList = new ArrayList<>();
        for (Duet duet : duets) {
            DuetListResponseDto duetListResponseDto = new DuetListResponseDto(
                    duet.getId(),
                    duet.getName(),
                    duet.getPath(),
                    duet.getUploader().getNickname(),
                    duet.getCreatedAt()
            );
            duetListResponseDtoList.add(duetListResponseDto);
        }
        return duetListResponseDtoList;
    }
    // 완성안된 내 duet list 조회
    @Override
    public List<DuetListResponseDto> getMyDuetList(Long memberId) {
        Member uploader = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        List<Duet> duets = duetRepository.findByUploaderAndParticipantIsNullAndDisplayTrueOrderByCreatedAtDesc(uploader);
        List<DuetListResponseDto> myDuetListResponseDtoList = new ArrayList<>();
        for (Duet duet : duets) {
            DuetListResponseDto duetListResponseDto = new DuetListResponseDto(
                    duet.getId(),
                    duet.getName(),
                    duet.getPath(),
                    duet.getUploader().getNickname(),
                    duet.getCreatedAt()
            );
            myDuetListResponseDtoList.add(duetListResponseDto);
        }
        return myDuetListResponseDtoList;
    }

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
//    @Override
//    public void createRecording(MultiCreateRequestDto multiCreateRequestDto) {
//        // player1에 해당하는 id값 찾는 로직
//        // 이미 player1에 값이 있으면 -> 밑에 로직이 player2로 가게 만들려고 하는거지
//
//        Member player1;
//        Member player2 = null;
//        if (multiCreateRequestDto.getPlayer1() != null) {
//            player1 = memberRepository.findById(multiCreateRequestDto.getPlayer1())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid player1 Id"));
//
//            player2 = memberRepository.findById(multiCreateRequestDto.getPlayer2())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid player2 Id"));
//        } else {
//            player1 = memberRepository.findById(multiCreateRequestDto.getPlayer1())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid player1 Id"));
//        }
//        multiRepository.save(multiCreateRequestDto.toEntity(player1, player2));
//    }

    //더미 데이터 생성
//    @Override
//    public void createRecordings(){
//        Member P1 = memberRepository.findById(1L).orElseThrow();
//        Member P2 = memberRepository.findById(2L).orElseThrow();
//        for (int i = 0; i < 1000; i++) {
//            multiRepository.save(Multi.builder().player1(P1).player2(P2).path("www").display(true).build());
//            multiRepository.save(Multi.builder().player1(P1).player2(P1).path("aaaa").display(true).build());
//        }
//    }

}
