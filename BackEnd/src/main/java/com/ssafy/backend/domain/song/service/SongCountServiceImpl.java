package com.ssafy.backend.domain.song.service;

import com.ssafy.backend.domain.song.entity.Song;
import com.ssafy.backend.domain.song.entity.SongCount;
import com.ssafy.backend.domain.song.repository.SongCountRepository;
import com.ssafy.backend.domain.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SongCountServiceImpl implements SongCountService {

    private final SongCountRepository songCountRepository;
    private final SongRepository songRepository;




}
