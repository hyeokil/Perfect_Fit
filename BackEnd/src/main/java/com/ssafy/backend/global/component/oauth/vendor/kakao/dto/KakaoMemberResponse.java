package com.ssafy.backend.global.component.oauth.vendor.kakao.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Kakao API로부터 받은 사용자 정보에 대한 응답을 나타내는 클래스.
 */
@Getter
@Setter
@JsonNaming(SnakeCaseStrategy.class)
public class KakaoMemberResponse {

    private Long id;
    private boolean hasSignedUp;
    private LocalDateTime connectedAt;
    private KakaoAccount kakaoAccount;

    /**
     * Member 도메인 객체로 변환합니다.
     *
     * @return 변환된 Member 객체.
     */
    public Member toDomain() {
        return Member.builder()
                .email(kakaoAccount.getEmail())
                .nickname(kakaoAccount.getProfile().getNickname())
                .image(kakaoAccount.getProfile().getProfileImageUrl())
                .oAuthDomain(OAuthDomain.KAKAO)
                .build();
    }

    /**
     * 카카오 계정 정보를 나타내는 클래스.
     */
    @Getter
    @Setter
    @JsonNaming(SnakeCaseStrategy.class)
    public static class KakaoAccount {
        private boolean profileNeedsAgreement;
        private boolean profileNicknameNeedsAgreement;
        private boolean profileImageNeedsAgreement;
        private Profile profile;
        private boolean nameNeedsAgreement;
        private String name;
        private boolean emailNeedsAgreement;
        private boolean isEmailValid;
        private boolean isEmailVerified;
        private String email;
        private boolean ageRangeNeedsAgreement;
        private String ageRange;
        private boolean birthyearNeedsAgreement;
        private String birthyear;
        private boolean birthdayNeedsAgreement;
        private String birthday;
        private String birthdayType;
        private boolean genderNeedsAgreement;
        private String gender;
        private boolean phoneNumberNeedsAgreement;
        private String phoneNumber;
        private boolean ciNeedsAgreement;
        private String ci;
        private LocalDateTime ciAuthenticatedAt;
    }

    /**
     * 카카오 프로필 정보를 나타내는 클래스.
     */
    @Getter
    @Setter
    @JsonNaming(SnakeCaseStrategy.class)
    public static class Profile {
        private String nickname;
        private String thumbnailImageUrl;
        private String profileImageUrl;
        private boolean isDefaultImag;
    }
}

