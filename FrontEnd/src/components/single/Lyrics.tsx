import React, { useState, useEffect, useRef } from "react";
import { instance } from "@/api/axios";
import styles from "@styles/single/Lyrics.module.scss";

interface LyricLine {
  order: number;
  script: string;
  time: string;
}

interface PropType {
  songId: number;
}

const Lyrics: React.FC<PropType> = ({ songId }) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const lyricsBoxRef = useRef<HTMLDivElement>(null);

  const fetchLyrics = async () => {
    try {
      const data = await instance.get(`/api/v1/lyrics/${songId}`).then(response => response.data.dataBody);
      setLyrics(data);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
  };

  useEffect(() => {
    fetchLyrics();
  }, [songId]);

  useEffect(() => {
    const scrollActiveLyricIntoView = () => {
      if (lyricsBoxRef.current) {
        const activeLyricElement = lyricsBoxRef.current.querySelector(
          `.${styles.activeLyric}`
        );
        if (activeLyricElement) {
          activeLyricElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }
    };

    scrollActiveLyricIntoView();
  }, [lyrics]);

  const displayedLyrics = lyrics.map((lyric) => (
    <p key={lyric.order} className={styles.activeLyric}>
      {lyric.script.trim()}
    </p>
  ));

  return (
    <div ref={lyricsBoxRef} className={styles.lyricsbox}>
      {displayedLyrics}
    </div>
  );
};

export default Lyrics;
