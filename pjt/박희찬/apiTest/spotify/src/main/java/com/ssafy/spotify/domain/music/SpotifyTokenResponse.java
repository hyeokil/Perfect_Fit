package com.ssafy.spotify.domain.music;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SpotifyTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;

    // getter와 setter 생략
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
