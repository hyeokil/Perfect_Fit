package com.ssafy.backend.global.component.oauth.exception;

import lombok.Getter;

@Getter
public class OAuthException extends RuntimeException {
    private final OAuthError errorCode;
    private final int status;
    private final String errorMessage;

    public OAuthException(OAuthError errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus().value();
        this.errorMessage = errorCode.getErrorMessage();
    }

    public OAuthException(OAuthError errorCode, Throwable e, String errorMessage) {
        super(errorCode.getErrorMessage(), e);
        this.errorCode = errorCode;
        this.status = errorCode.getHttpStatus().value();
        this.errorMessage = errorMessage;
    }
}

