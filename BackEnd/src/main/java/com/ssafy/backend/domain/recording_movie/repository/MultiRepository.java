package com.ssafy.backend.domain.recording_movie.repository;

import com.ssafy.backend.domain.recording_movie.entity.Multi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultiRepository extends JpaRepository<Multi, Long> {

    List<Multi> findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNull(Long Player1);

    List<Multi> findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNotNull(Long Player1);
}
