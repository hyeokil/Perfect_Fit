package com.ssafy.backend.domain.follow.exception;

import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class FollowExceptionHandler {
    @ExceptionHandler(FollowException.class)
    public ResponseEntity<Message<Void>> followException(FollowException e) {
        log.error("{} is occurred", e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(Message.fail(null, e.getErrorMessage()));
    }
}
