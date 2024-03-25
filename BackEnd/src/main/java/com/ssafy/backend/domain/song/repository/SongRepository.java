package com.ssafy.backend.domain.song.repository;

import com.ssafy.backend.domain.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId ORDER BY song.song_view DESC LIMIT 100", nativeQuery = true)
    List<Song> findPopular100(@Param("memberId") Long memberId);

    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId ORDER BY song.song_release_date DESC LIMIT 100", nativeQuery = true)
    List<Song> findLatest100(@Param("memberId") Long memberId);

    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId WHERE song.song_genre LIKE :genre ORDER BY song.song_view DESC LIMIT 100", nativeQuery = true)
    List<Song> findGenre100(@Param("memberId") Long memberId, @Param("genre") String genre);

    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId ORDER BY RAND() LIMIT :pageSize OFFSET :page", nativeQuery = true)
    List<Song> findRandomAll(@Param("memberId") Long memberId, @Param("page") int page, @Param("pageSize") int pageSize);


}
