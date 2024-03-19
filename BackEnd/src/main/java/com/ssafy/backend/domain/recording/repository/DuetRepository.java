package com.ssafy.backend.domain.recording.repository;

import com.ssafy.backend.domain.recording.entity.Duet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DuetRepository extends JpaRepository<Duet, Long> {

    List<Duet> findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNull(Long Player1);

    List<Duet> findByPlayer1IdAndDisplayTrueAndPlayer2IdIsNotNull(Long Player1);

    List<Duet> findByPlayer2IdAndDisplayTrue(Long Player2);

    List<Duet> findByDisplayTrueAndPlayer2IdIsNull();

    Optional<Duet> findByIdAndDisplayTrue(Long id);
}
