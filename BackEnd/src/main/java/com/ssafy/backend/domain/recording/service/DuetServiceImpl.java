package com.ssafy.backend.domain.recording.service;


import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.recording.dto.DuetCreateRequestDto;
import com.ssafy.backend.domain.recording.dto.DuetFinishedListResponseDto;
import com.ssafy.backend.domain.recording.dto.DuetListResponseDto;
import com.ssafy.backend.domain.recording.dto.DuetParticipateReqeustDto;
import com.ssafy.backend.domain.recording.entity.Duet;
import com.ssafy.backend.domain.recording.repository.DuetRepository;
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
public class DuetServiceImpl implements DuetService {

    private final DuetRepository duetRepository;
    private final MemberRepository memberRepository;
    private final SongRepository songRepository;
    // duet upload
    @Override
    public void createDuet(Long memberId, Long songId, DuetCreateRequestDto duetCreateRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Song song = songRepository.findById(songId).orElseThrow(()
                -> new IllegalArgumentException("해당 노래를 찾을 수 없다 ! : " + songId));
        duetRepository.save(duetCreateRequestDto.toEntity(member, song));
    }

    // duet participate
    @Override
    public void participateDuet(Long memberId, Long songId, DuetParticipateReqeustDto duetParticipateReqeustDto) {
        Member uploader = memberRepository.findById(duetParticipateReqeustDto.getUploaderId()).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Member participant = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Song song = songRepository.findById(songId).orElseThrow(()
                -> new IllegalArgumentException("해당 노래를 찾을 수 없다 ! : " + songId));
        duetRepository.save(duetParticipateReqeustDto.toEntity(uploader, participant, song));
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
                    duet.getUserPath(),
                    duet.getAudioPath(),
                    duet.getUploader().getId(),
                    duet.getUploader().getNickname(),
                    duet.getUploader().getImage(),
                    duet.getCreatedAt(),
                    duet.getSong().getId(),
                    duet.getSong().getSongTitle(),
                    duet.getSong().getArtist().getName(),
                    duet.getSong().getSongThumbnail()
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
                    duet.getUserPath(),
                    duet.getAudioPath(),
                    duet.getUploader().getId(),
                    duet.getUploader().getNickname(),
                    duet.getUploader().getImage(),
                    duet.getCreatedAt(),
                    duet.getSong().getId(),
                    duet.getSong().getSongTitle(),
                    duet.getSong().getArtist().getName(),
                    duet.getSong().getSongThumbnail()
            );
            myDuetListResponseDtoList.add(duetListResponseDto);
        }
        return myDuetListResponseDtoList;
    }
    // 완성된 내 duet list 조회
    @Override
    public List<DuetFinishedListResponseDto> getMyDuetFinishedList(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        List<Duet> duets = duetRepository.findDuetByMemberAndDisplayOrderByCreatedAtDesc(member);
        List<DuetFinishedListResponseDto> myDuetFinishedListResponseDtoList = new ArrayList<>();
        for (Duet duet : duets) {
            DuetFinishedListResponseDto duetFinishedListResponseDto = new DuetFinishedListResponseDto(
                    duet.getId(),
                    duet.getName(),
                    duet.getUserPath(),
                    duet.getAudioPath(),
                    duet.getUploader().getNickname(),
                    duet.getUploader().getImage(),
                    duet.getParticipant().getNickname(),
                    duet.getParticipant().getImage(),
                    duet.getCreatedAt(),
                    duet.getSong().getSongTitle(),
                    duet.getSong().getArtist().getName(),
                    duet.getSong().getSongThumbnail()
            );
            myDuetFinishedListResponseDtoList.add(duetFinishedListResponseDto);
        }
        return myDuetFinishedListResponseDtoList;
    }

    @Override
    public DuetFinishedListResponseDto getDuet(Long duetId) {
        Duet duet = duetRepository.findById(duetId).orElseThrow(()
                -> new IllegalArgumentException("해당 듀엣을 찾을 수 없다 ! : " + duetId));
        DuetFinishedListResponseDto duetFinishedListResponseDto;
        if (duet.getParticipant()==null){
            duetFinishedListResponseDto = new DuetFinishedListResponseDto(
                    duet.getId(),
                    duet.getName(),
                    duet.getUserPath(),
                    duet.getAudioPath(),
                    duet.getUploader().getNickname(),
                    duet.getUploader().getImage(),
                    null,
                    null,
                    duet.getCreatedAt(),
                    duet.getSong().getSongTitle(),
                    duet.getSong().getArtist().getName(),
                    duet.getSong().getSongThumbnail()
            );
        }else{
            duetFinishedListResponseDto = new DuetFinishedListResponseDto(
                    duet.getId(),
                    duet.getName(),
                    duet.getUserPath(),
                    duet.getAudioPath(),
                    duet.getUploader().getNickname(),
                    duet.getUploader().getImage(),
                    duet.getParticipant().getNickname(),
                    duet.getParticipant().getImage(),
                    duet.getCreatedAt(),
                    duet.getSong().getSongTitle(),
                    duet.getSong().getArtist().getName(),
                    duet.getSong().getSongThumbnail()
            );
        }
        return duetFinishedListResponseDto;
    }

}
