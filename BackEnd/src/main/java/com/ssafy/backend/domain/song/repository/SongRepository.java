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

//    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId WHERE song.song_genre LIKE :genre ORDER BY song.song_view DESC LIMIT 100", nativeQuery = true)
//    List<Song> findGenre100(@Param("memberId") Long memberId, @Param("genre") String genre);

    @Query(value = "SELECT song.*, my_list.my_list_display FROM song JOIN genre ON song.genre_id = genre.id LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId WHERE genre.name IN (:searchGenres) ORDER BY song.song_release_date DESC LIMIT 100", nativeQuery = true)
    List<Song> findGenre100(@Param("memberId") Long memberId, @Param("searchGenres") List<String> searchGenres);


    @Query(value = "SELECT song.*, my_list.my_list_display FROM song LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId ORDER BY RAND() LIMIT :pageSize OFFSET :page", nativeQuery = true)
    List<Song> findRandomAll(@Param("memberId") Long memberId, @Param("page") int page, @Param("pageSize") int pageSize);

    @Query(value = "SELECT song.*, artist.name FROM song JOIN artist ON song.artist_id = artist.id WHERE song.song_title LIKE :keyword OR artist.name LIKE :keyword", nativeQuery = true)
    List<Song> searchSongs(@Param("keyword") String keyword);


    @Query(
            value = "SELECT song.*, my_list.my_list_display,  COUNT(*) AS play_count " +
                    "FROM song " +
                    "JOIN song_history ON song_history.song_id = song.id " +
                    "LEFT JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId " +
                    "WHERE HOUR(song_history.created_at) = HOUR(NOW()) " +
                    "GROUP BY song.id, my_list.my_list_display " +
                    "ORDER BY play_count DESC " +
                    "LIMIT 100",
            nativeQuery = true
    )
    List<Song> findPopularSongs100ByHour(@Param("memberId") Long memberId);


    // 동요 차트 100 조회
    @Query(
            value = "SELECT song.*, my_list.my_list_display " +
                    "FROM song " +
                    "JOIN genre ON genre.id = song.genre_id " +
                    "LEFT OUTER JOIN my_list ON song.id = my_list.song_id AND my_list.member_id = :memberId " +
                    "WHERE genre.name LIKE '%동요%' " +
                    "ORDER BY song.song_view DESC " +
                    "LIMIT 100",
            nativeQuery = true)
    List<Song> findChildrenSongs100(@Param("memberId") Long memberId);



}
