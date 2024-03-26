package com.ssafy.backend.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberGetResponseDto {
    Long id;
    String email;
    String nickname;
    String image;
}
