package com.ssafy.backend.domain.reels.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.reels.dto.ReelsCreateRequestDto;
import com.ssafy.backend.domain.reels.dto.ReelsListResponseDto;

import com.ssafy.backend.domain.reels.entity.Reels;
import com.ssafy.backend.domain.reels.repository.ReelsRepository;
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
public class ReelsServiceImpl implements ReelsService{

    private final MemberRepository memberRepository;

    private final SongRepository songRepository;

    private final ReelsRepository reelsRepository;

    @Override
    public Long createReels(Long memberId, ReelsCreateRequestDto reelsCreateRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Song song = songRepository.findById(reelsCreateRequestDto.getSongId()).orElseThrow(()
                -> new IllegalArgumentException("노래없다"));
        Reels reels = reelsRepository.save(reelsCreateRequestDto.toEntity(member, song));
        return reels.getId();
    }

    @Override
    public List<ReelsListResponseDto> getMyReels(Long memberId) {
        List<Reels> reels = reelsRepository.findByMemberId(memberId);
        List<ReelsListResponseDto> reelsListResposeDtoList = new ArrayList<>();
        for (Reels reel : reels) {
            ReelsListResponseDto reelsListResponseDto = new ReelsListResponseDto(
                    reel.getId(),
                    reel.getTime(),
                    reel.getUserPath(),
                    reel.getAudioPath(),
                    reel.getSong().getSongTitle(),
                    reel.getSong().getArtist().getName(),
                    reel.getSong().getSongThumbnail(),
                    reel.getCreatedAt()
            );
            reelsListResposeDtoList.add(reelsListResponseDto);
        }
        return reelsListResposeDtoList;
    }

}
