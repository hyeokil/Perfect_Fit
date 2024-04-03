package com.ssafy.backend.domain.lyrics.repository;

import com.ssafy.backend.domain.lyrics.entity.Lyrics;
import com.ssafy.backend.domain.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface LyricsRepository extends JpaRepository<Lyrics, Long> {


    boolean existsBySongId(Long songId);

    @Query(value = "SELECT * FROM lyrics where song_id = :songId", nativeQuery = true)
    List<Lyrics> findLylics(@Param("songId") Long songId);


    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId ORDER BY song.song_view DESC LIMIT 100", nativeQuery = true)
    List<Song> findPopular100(@Param("memberId") Long memberId);
}
