package com.ssafy.backend.domain.my_list.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetGenreCountDto {

    private String genreName;
    private Long count;

}
