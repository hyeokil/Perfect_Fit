package com.ssafy.backend.domain.my_list.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.my_list.dto.GetMyListResponseDto;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.my_list.repository.MyListRepository;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MyListServiceImpl implements MyListService{

    private final MyListRepository myListRepository;
    private final MemberRepository memberRepository;
    private final SongRepository songRepository;


    @Override
    public Boolean likeSong(Long songId, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new IllegalArgumentException("해당 노래를 찾을 수 없다 ! : " + songId));

        MyList myList = myListRepository.findByMemberAndSong(member, song);

        if (myList!= null) {
            // DB에 기록이 있으면 -> 좋아요 토글
            myList.setMyListDisplay(!myList.getMyListDisplay());
        } else {
            // DB에 기록이 없으면 -> 좋아요 추가 및 데이터 추가
            myList = MyList.builder()
                    .song(song)
                    .member(member)
                    .myListDisplay(true)
                    .build();
        }
        myListRepository.save(myList);
        return myList.getMyListDisplay();
    }


    @Override
    public List<GetMyListResponseDto> getLikedSongs(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberError.NOT_FOUND_MEMBER));
        List<MyList> likedSongs = myListRepository.findByMemberAndMyListDisplayTrue(member);
        return likedSongs.stream()
                .map(myList -> new GetMyListResponseDto(
                        myList.getSong().getId(),
                        myList.getSong().getSongTitle(),
                        myList.getSong().getArtist().getName(),
                        myList.getSong().getGenre().getName(),
                        myList.getSong().getSongUrl(),
                        myList.getSong().getSongThumbnail(),
                        myList.getSong().getSongReleaseDate(),
                        myList.getSong().getSongView(),
                        myList.getSong().getSongLength(),
                        myList.getMyListDisplay(),
                        myList.getSong().getSongPitch(),
                        myList.getSong().getMrPath()
                ))
                .collect(Collectors.toList());
    }
}