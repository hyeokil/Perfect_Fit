package com.ssafy.backend.domain.follow.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FollowError {

    CANNOT_FOLLOW_SELF(HttpStatus.BAD_REQUEST, "자신을 팔로우할 수 없습니다.");


    private final HttpStatus httpStatus;
    private final String errorMessage;
}
