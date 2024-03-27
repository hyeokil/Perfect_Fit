package com.ssafy.backend.domain.my_list.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MyListRepository extends JpaRepository<MyList, Long> {

    MyList findByMemberAndSong(Member member, Song song);

    List<MyList> findByMemberAndMyListDisplayTrue(Member member);

    Optional<MyList> findByMemberIdAndSongId(Long memberId, Long songId);



}
