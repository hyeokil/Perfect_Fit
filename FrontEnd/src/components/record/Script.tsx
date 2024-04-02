import React, { useEffect, useRef } from "react";
import styles from "@styles/record/script.module.scss";

type ScriptProps = {
  isTrackingStarted: boolean;
};

const lyrics = [
  "동해 물과 백두산이 마르고 닳도록",
  "하느님이 보우하사 우리나라 만세",
  "무궁화 삼천리 화려 강산",
  "대한 사람 대한으로 길이 보전하세"
];

const Script: React.FC<ScriptProps> = ({ isTrackingStarted }) => {
  const lyricsRefs = useRef<(HTMLSpanElement | null)[][]>([]);

  useEffect(() => {
    if (isTrackingStarted) {
      const animateLyrics = () => {
        lyricsRefs.current.forEach((lineRefs, lineIndex) => {
          setTimeout(() => {
            lineRefs.forEach((charRef) => {
              if (charRef) {
                charRef.style.color = "black"; // 글자 색상 초기화
              }
            });
          }, 15000 * lineIndex); // 각 라인의 시작 시간 설정
          
          setTimeout(() => {
            lineRefs.forEach((charRef) => {
              if (charRef) {
                charRef.style.color = " #46B8E0"; // 첫 번째 글자부터 빨간색으로 변경
              }
            });
          }, 15000 * lineIndex + 1000); // 1초 후 첫 번째 글자 색상 변경

          for (let i = 1; i < lineRefs.length; i++) {
            setTimeout(() => {
              const charRef = lineRefs[i];
              if (charRef) {
                charRef!.style.color = "#46B8E0"; // Non-null assertion operator 사용
              }
            }, 15000 * lineIndex + 1000 + i * 1500);
          }
        });
      };

      animateLyrics();
    }
  }, [isTrackingStarted]); // isTrackingStarted가 변경될 때마다 애니메이션 재생

  return (
    <div className={styles.script}>
      {lyrics.map((line, lineIndex) => (
        <div key={lineIndex}>
          {line.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              ref={(el) => {
                // lyricsRefs 배열 초기화
                if (!lyricsRefs.current[lineIndex]) {
                  lyricsRefs.current[lineIndex] = [];
                }
                lyricsRefs.current[lineIndex][charIndex] = el;
              }}
              className={styles.lyricsline}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Script;
