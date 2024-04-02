package com.ssafy.backend.domain.reels.dto;

import com.ssafy.backend.domain.reels.entity.ReelsPlayTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReelsPlayTimeRequestDto {

    private Long playTime;

    private Long reelsId;


    public ReelsPlayTime toEntity(Long member) {
        return ReelsPlayTime.builder()
                .memberId(member)
                .reelsId(reelsId)
                .playTime(playTime)
                .build();

    }
}
