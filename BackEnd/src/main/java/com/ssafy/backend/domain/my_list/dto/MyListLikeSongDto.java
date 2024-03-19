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
public class MyListLikeSongDto {

    private Long memberId;
    private Long songId;

    public MyList toEntity(Member member, Song song) {
        return MyList.builder()
                .member(member)
                .song(song)
                .myListDisplay(true) // 좋아요를 누르면 myListDisplay를 true로 설정
                .build();
    }


}
