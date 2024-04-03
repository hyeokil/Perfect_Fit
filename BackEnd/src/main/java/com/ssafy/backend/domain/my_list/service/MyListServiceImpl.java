package com.ssafy.backend.domain.my_list.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberError;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.my_list.dto.GetGenreCountDto;
import com.ssafy.backend.domain.my_list.dto.GetMyListResponseDto;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.my_list.repository.MyListRepository;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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


    public class GenreGroup {
        public static Map<String, List<Integer>> genreGroups = new HashMap<>();
        static {
            genreGroups.put("팝", Arrays.asList(20, 13, 14, 97, 145, 31, 154, 155, 33, 153, 52, 53, 66, 92, 113, 204));
            genreGroups.put("록", Arrays.asList(27, 13));
            genreGroups.put("힙합", Arrays.asList(1, 30, 47, 71, 58, 61, 64));
            genreGroups.put("발라드", Arrays.asList(8));
            genreGroups.put("댄스", Arrays.asList(3, 11, 18, 69, 82, 109, 180));
            genreGroups.put("트로트", Arrays.asList(5));
            genreGroups.put("어쿠스틱", Arrays.asList(21, 33, 36, 194));
            genreGroups.put("R&B", Arrays.asList(4, 7, 34, 61, 106));
            genreGroups.put("재즈", Arrays.asList(58, 68, 130, 179));
            genreGroups.put("OST", Arrays.asList(9, 12, 16, 25, 26, 32, 45, 65, 83, 85, 89));
            genreGroups.put("동요", Arrays.asList(23, 98, 99, 100, 176));
        }
    }

    @Override
    public List<GetGenreCountDto> getCount(Long memberId) {
        List<Integer> likedGenreIds = myListRepository.getCount(memberId).stream()
                .mapToInt(Long::intValue)
                .boxed()
                .collect(Collectors.toList());

        Map<String, Long> genreCountMap = new HashMap<>();

        GenreGroup.genreGroups.forEach((genreName, genreIds) -> {
            Long count = likedGenreIds.stream()
                    .filter(genreIds::contains)
                    .count();
            if (count > 0) {
                genreCountMap.put(genreName, count);
            }
        });

        return genreCountMap.entrySet().stream()
                .map(result -> GetGenreCountDto.builder()
                        .genreName(result.getKey())
                        .count(result.getValue())
                        .build())
                .collect(Collectors.toList());
    }











}