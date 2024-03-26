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
            String artistName = reel.getSong().getArtist().getArtist();
            ReelsListResponseDto reelsListResponseDto = new ReelsListResponseDto(
                    reel.getId(),
                    reel.getTime(),
                    reel.getSong().getSongTitle(),
//                    reel.getSong().getSongArtist(),
                    artistName,
                    reel.getCreatedAt()
            );
            reelsListResposeDtoList.add(reelsListResponseDto);
        }

        return reelsListResposeDtoList;
    }

//    public class OneHotEncoding {
//        private Map<String, Integer> indexMapping;
//
//        public OneHotEncoding(List<String> categories)
//    }

//    @Override
//    public List<Reels> recommendReels(Long reelsId, Pageable pageable) {
//        Reels reels = reelsRepository.findById(reelsId)
//                .orElseThrow(() -> new IllegalArgumentException("릴스 없음"));
//
//        double[] reelsVector = extractFeatures(reels);
//
//        List<Reels> allReels = reelsRepository.findAll();
//        Map<Reels, Double> similarity = new HashMap<>();
//
//        for (Reels reel : allReels) {
//            double[] reelVector = extractFeatures(reel);
//            double similar = consinSimilarity();
//        }
//    }
}
