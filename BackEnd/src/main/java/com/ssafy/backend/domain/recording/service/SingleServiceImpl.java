package com.ssafy.backend.domain.recording.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording.dto.SingleCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.SingleResponseDto;
import com.ssafy.backend.domain.recording.entity.Single;
import com.ssafy.backend.domain.recording.repository.SingleRepository;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
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
    private final SongRepository songRepository;


    // single recording 저장
    @Override
    public void createSingle(Long memberId, Long songId, SingleCreateRequestDto singleCreateRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new IllegalArgumentException("해당 노래를 찾을 수 없다 ! : " + songId));
        singleRepository.save(singleCreateRequestDto.toEntity(member,song));
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
                    single.getCreatedAt(),
                    single.getSong().getSongTitle(),
                    single.getSong().getArtist().getName(),
                    single.getSong().getSongThumbnail()
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


}
