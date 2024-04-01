package com.ssafy.backend.domain.recording.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.SingleResponseDto;
import com.ssafy.backend.domain.recording.entity.Single;
import com.ssafy.backend.domain.recording.repository.SingleRepository;
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
public class SingleServiceImpl implements SingleService{

    private final SingleRepository singleRepository;
    private final MemberRepository memberRepository;


    // single recording 저장
    @Override
    public void createSingle(Long memberId, SingleCreateRequestDto singleCreateRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        singleRepository.save(singleCreateRequestDto.toEntity(member));
    }

    // 내가 single모드로 부른 노래 리스트 조회 단순 포문 사용
    @Override
    public List<SingleResponseDto> getSingleList(Long memberId) {
        List<Single> singles = singleRepository.findByMemberIdAndDisplayTrue(memberId);
        List<SingleResponseDto> singleResponseDtoList = new ArrayList<>();
        for (Single single : singles) {
            SingleResponseDto singleResponseDto = new SingleResponseDto(
                    single.getId(),
                    single.getName(),
                    single.getPath(),
                    single.getCreatedAt()
            );
            singleResponseDtoList.add(singleResponseDto);
        }
        return singleResponseDtoList;
    }

//    // 내가 single모드로 부른 노래 리스트 조회 stream API 사용
//    @Override
//    public List<SingleListResponseDto> getSingleList(Long memberId) {
//        List<Single> singles = singleRepository.findByMemberIdAndDisplayTrue(memberId);
//
//        return singles.stream()
//                .map(single -> new SingleResponseDto(
//                        single.getId(),
//                        single.getName(),
//                        single.getPath(),
//                        single.getCreatedAt()
//                ))
//                .collect(Collectors.toList());
//    }


//    // 단일 single list 조회
//    @Override
//    public String getRecording(Long singleId, Long memberId) {
//        return singleRepository.findByIdAndMemberIdAndDisplayTrue(singleId, memberId)
//                .map(Single::getPath)
//                .orElseThrow(() -> new EntityNotFoundException("Single not found"));
//    }

    // 더미 데이터 생성
//    @Override
//    public void createRecordings(){
//        Member P1 = memberRepository.findById(1L).orElseThrow();
//        for (int i = 0; i < 10000; i++) {
//            singleRepository.save(Single.builder().single(P1).display(true).path("wwww").build());
//            singleRepository.save(Single.builder().single(P1).display(false).path("wewew").build());
//        }
//    }

}
