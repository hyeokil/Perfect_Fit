package com.ssafy.backend.domain.my_list.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.my_list.dto.MyListGetMyLikeSongDto;
import com.ssafy.backend.domain.my_list.dto.MyListLikeSongDto;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.my_list.repository.MyListRepository;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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
    public Long likeSong(Long songId, MyListLikeSongDto myListLikeSongDto) {
        Long memberId = myListLikeSongDto.getMemberId();
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없다 ! : " + memberId));
        Song song = songRepository.findById(songId)
                .orElseThrow(() -> new IllegalArgumentException("해당 노래를 찾을 수 없다 ! : " + songId));

        Optional<MyList> myListOptional = myListRepository.findByMemberAndSong(member, song);

        if (myListOptional.isPresent()) {
            // DB에 기록이 있으면 -> 좋아요 토글
            MyList myList = myListOptional.get();
            myList.setMyListDisplay(!myList.isMyListDisplay());
            myListRepository.save(myList);
            return myList.getId();
        } else {
            // DB에 기록이 없으면 -> 좋아요 추가 및 데이터 추가
            MyList myList = myListRepository.save(myListLikeSongDto.toEntity(member, song));
            return myList.getId();
        }
    }


    @Override
    public List<MyListGetMyLikeSongDto> getLikedSongs(MyListGetMyLikeSongDto myListGetMyLikeSongDto) {
        Long memberId = myListGetMyLikeSongDto.getMemberId();
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없다 ! : " + memberId));

        List<MyList> likedSongs = myListRepository.findByMemberAndMyListDisplayTrue(member);

        return likedSongs.stream()
                .map(song -> new MyListGetMyLikeSongDto(memberId, song.getSong().getId(), song.isMyListDisplay()))
                .collect(Collectors.toList());
    }



}
