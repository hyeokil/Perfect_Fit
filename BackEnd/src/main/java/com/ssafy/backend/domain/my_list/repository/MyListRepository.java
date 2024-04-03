package com.ssafy.backend.domain.my_list.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MyListRepository extends JpaRepository<MyList, Long> {

    MyList findByMemberAndSong(Member member, Song song);

    List<MyList> findByMemberAndMyListDisplayTrue(Member member);

    Optional<MyList> findByMemberIdAndSongId(Long memberId, Long songId);


    @Query(value = "    SELECT song.genre_id FROM my_list JOIN song ON my_list.song_id = song.id WHERE my_list.member_id = :memberId", nativeQuery = true)
    List<Long> getCount(@Param("memberId") Long memberId);


}
