package com.ssafy.backend.domain.song.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class SongCountId implements Serializable {

    private Long SongId;

}
