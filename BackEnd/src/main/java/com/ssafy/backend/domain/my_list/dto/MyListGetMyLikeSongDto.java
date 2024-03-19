package com.ssafy.backend.domain.my_list.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyListGetMyLikeSongDto {

    private Long memberId;
    private Long songId;
    private Boolean myListDisplay;

}
