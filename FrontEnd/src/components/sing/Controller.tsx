// import { ChangeEvent, useEffect, useRef, useState } from "react";
// import { PitchShifter } from "soundtouchjs";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/sing/Controller.module.scss";
const Controller = () => {
  // -------------------------------------------------------
  // const [pitch, setPitch] = useState<number>(1.0);
  // const [tempo, setTempo] = useState<number>(1.0);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [shift, setShift] = useState<any>(null);
  // const audioCtx = new AudioContext();
  // const state = audioCtx.state;
  // console.log("현재 피치 : ", pitch);
  // console.log("오디오 상태 : ", state);

  // const shiftRef = useRef<PitchShifter | null>(null);
  // const audioCtxRef = useRef<AudioContext | null>(null);

  // useEffect(() => {
  //   audioCtxRef.current = new AudioContext();
  //   return () => {
  //     // 컴포넌트가 언마운트 될 때 AudioContext를 종료
  //     audioCtxRef.current?.close();
  //   };
  // }, []);

  // const onLoad = async ({ target: { result: buffer } }: any) => {
  //   if (shiftRef.current) {
  //     shiftRef.current.disconnect();
  //   }
  //   if (buffer) {
  //     const audioCtx = audioCtxRef.current;
  //     if (audioCtx) {
  //       const audioBuffer = await audioCtx.decodeAudioData(buffer);
  //       const myShift = new PitchShifter(audioCtx, audioBuffer, 16384);
  //       myShift.tempo = tempo;
  //       myShift.pitch = pitch;
  //       setShift(myShift);
  //       shiftRef.current = myShift;
  //       if (isPlaying) {
  //         myShift.connect(audioCtx.destination);
  //         audioCtx.resume();
  //       }
  //     }
  //   }
  // };

  // // 저장되어있는 파일 사용하기
  // const loadFile = async () => {
  //   try {
  //     const res = await fetch("/src/assets/video/[MR] 기리보이 - Zoa.wav");
  //     const buffer = await res.arrayBuffer();
  //     onLoad({ target: { result: buffer } });
  //   } catch (error) {
  //     console.error;
  //   }
  // };

  // // const newShifter = (buffer) => {
  // //   const myShift = new PitchShifter(audioCtx, buffer, 16384);
  // //   setShift(myShift);
  // //   myShift.tempo = tempo;
  // //   myShift.pitch = pitch;
  // //   myShift.connect(audioCtx.destination);
  // // };

  // useEffect(() => {
  //   loadFile();
  //   return () => {
  //     // 컴포넌트가 언마운트 될 때 PitchShifter를 해제
  //     if (shiftRef.current) {
  //       shiftRef.current.disconnect();
  //     }
  //   };
  // }, []);

  // const togglePlayback = () => {
  //   if (shiftRef.current) {
  //     if (isPlaying) {
  //       shiftRef.current.disconnect();
  //     } else {
  //       shiftRef.current.connect(audioCtxRef.current!.destination);
  //       audioCtxRef.current!.resume();
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  // const handleChangePitch = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(e.target.value);
  //   setPitch(value);
  //   if (shiftRef.current) {
  //     shiftRef.current.pitch = value;
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      {/* <h1>컨트롤러!!!</h1>
      <div className={styles.play}>
        <button className={styles.controlbutton} onClick={togglePlayback}>
          {isPlaying ? (
            <FontAwesomeIcon className={styles.icon} icon={faPause} />
          ) : (
            <FontAwesomeIcon className={styles.icon} icon={faPlay} />
          )}
        </button>
      </div>
      <div className={styles.controlbox}>
        <input
          type="range"
          onChange={handleChangePitch}
          value={pitch}
          min="0.5"
          max="2"
          step="0.01"
        />
        <div>
          <p>{pitch}</p>
          <label>피치</label>
        </div>
      </div> */}
    </div>
  );
};

export default Controller;
