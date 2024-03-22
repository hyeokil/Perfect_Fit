package com.ssafy.backend.domain.follow.entity;

import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(Follow.PK.class)
public class Follow extends BaseEntity {

    @Id
    private Long followingId;

    @Id
    private Long followerId;

    private boolean active;

    public void updateActive() {
        this.active = !this.active;
    }

    public static class PK implements Serializable {
        Long followingId;
        Long followerId;
    }

}
