package com.ssafy.backend.domain.recording_movie.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.recording_movie.entity.Recording;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class RecordingCreateRequestDto {

    private Long singleId;

    private Long multiId;

    private String name;

    private String path;

    private boolean display;

    public Recording toEntity(Member singleId, Member multiId) {
        return Recording.builder()
                .single(singleId)
                .multi(multiId)
                .name(name)
                .path(path)
                .display(display)
                .build();
    }
}
