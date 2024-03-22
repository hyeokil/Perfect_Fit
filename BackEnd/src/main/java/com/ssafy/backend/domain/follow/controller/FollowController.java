package com.ssafy.backend.domain.follow.controller;



import com.ssafy.backend.domain.follow.service.FollowService;
import com.ssafy.backend.domain.member.dto.MemberLoginActiveDto;
import com.ssafy.backend.global.common.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/follow")
public class FollowController {
    private final FollowService followService;

    @PostMapping("/update/{followerId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Message<Boolean>> updateFollow(@AuthenticationPrincipal MemberLoginActiveDto loginActiveDto,
                                                         @PathVariable("followerId") Long followerId) {
        boolean isActive = followService.updateFollow(loginActiveDto.getId(), followerId);
        return ResponseEntity.ok().body(Message.success(isActive));
    }

}
