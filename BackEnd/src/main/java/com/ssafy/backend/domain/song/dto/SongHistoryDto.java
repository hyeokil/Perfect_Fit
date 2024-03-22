package com.ssafy.backend.domain.song.dto;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.my_list.entity.MyList;
import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.entity.SongHistory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SongHistoryDto {

    private Long memberId;

    private Long songId;


    public SongHistory toEntity(Member member, Song song) {
        return SongHistory.builder()
                .member(member)
                .song(song)
                .build();
    }

}
