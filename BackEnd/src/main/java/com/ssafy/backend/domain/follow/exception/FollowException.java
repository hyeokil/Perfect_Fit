package com.ssafy.backend.domain.follow.exception;

import lombok.Getter;

@Getter
public class FollowException extends RuntimeException {
    private final FollowError errorCode;
    private final int status;
    private final String errorMessage;

    public FollowException(FollowError errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus().value();
        this.errorMessage = errorCode.getErrorMessage();
    }
}
