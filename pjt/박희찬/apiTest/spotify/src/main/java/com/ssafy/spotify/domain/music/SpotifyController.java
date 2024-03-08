package com.ssafy.spotify.domain.music;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.*;

@RestController
@RequestMapping("api/v1/")
public class SpotifyController {
    @Value("5965b7d52b724e46a4f2d646a0660deb")
    private String clientId; // application.properties에 설정된 클라이언트 ID

    @Value("fe20647da28f4b57aebc202c75abc8ae")
    private String clientSecret; // application.properties에 설정된 클라이언트 시크릿

    private final String tokenUrl = "https://accounts.spotify.com/api/token";

    private RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/spotify/token")
    public String getSpotifyToken() {
        restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(clientId, clientSecret);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "client_credentials");

        // AccessToken 요청 body 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // Spotify 토큰 API로 AccessToken 요청
//        ResponseEntity<SpotifyTokenResponse> response = restTemplate.postForEntity("https://accounts.spotify.com/api/token", request, SpotifyTokenResponse.class);
        ResponseEntity<SpotifyTokenResponse> response = restTemplate.postForEntity(tokenUrl, request, SpotifyTokenResponse.class);

        SpotifyTokenResponse tokenResponse = response.getBody();
        if (tokenResponse != null) {
            System.out.println("Access token sucessfully!!");
            return tokenResponse.getAccessToken();
        } else {
            // 오류 처리
            throw new RuntimeException("Failed to retrieve access token");
        }
    }

    @GetMapping("/search")
    public String search(String accessToken, String q) {
        accessToken = getSpotifyToken();

        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Host", "api.spotify.com");
        headers.add("Content-type", "application/json");
        String body = "";

        HttpEntity<String> requestEntity = new HttpEntity<String>(body, headers);
        ResponseEntity<String> responseEntity = rest.exchange("https://api.spotify.com/v1/search?type=artist&q=" + q, HttpMethod.GET, requestEntity, String.class);
//        HttpStatus httpStatus = (HttpStatus) responseEntity.getStatusCode();
        HttpStatusCode httpStatus = responseEntity.getStatusCode();
        int status = httpStatus.value(); //상태 코드가 들어갈 status 변수
        String response = responseEntity.getBody();
        System.out.println("Response status: " + status);
        System.out.println(response);

        return response;
    }

    @GetMapping("/recommendations/available-genre-seeds")
    public ResponseEntity<List<String>> allGenres(String accessToken) {
        String url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
        accessToken = getSpotifyToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        // Spotify API 응답을 Map의 리스트로 받아옵니다.
        ResponseEntity<Map<String, List<String>>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, List<String>>>() {}
        );

        // 가져온 장르 목록만 추출합니다.
        List<String> genres = response.getBody().get("genres");
        return ResponseEntity.ok(genres);
    }


}
