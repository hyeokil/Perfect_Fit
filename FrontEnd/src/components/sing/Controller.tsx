import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PitchShifter } from "soundtouchjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/sing/Controller.module.scss";
// import Slider from '@mui/material/Slider';

// const sliderStyle = {
//   color: "rgba(0,0,0,0.87)",
//   height: 4,
//   "& .MuiSlider-thumb": {
//     width: 8,
//     height: 8,
//     color: "rgba(0,0,0,0.87)",
//     transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
//     "&:before": {
//       boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
//     },
//     "&:hover, &.Mui-focusVisible": {
//       boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%) `,
//     },
//     "&.Mui-active": {
//       width: 20,
//       height: 20,
//     },
//   },
//   "& .MuiSlider-rail": {
//     opacity: 0.28,
//   },
//   "& .MuiSlider-mark": {
//     height: 8,
//     "&.MuiSlider-markActive": {
//       backgroundColor: "rgba(0,0,0,0.87)",
//     },
//   },
// };

const Controller = () => {
  // -------------------------------------------------------
  const [pitch, setPitch] = useState<number>(1.0);
  const [tempo, setTempo] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const shiftRef = useRef<PitchShifter | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioCtxRef.current = new AudioContext();
    return () => {
      // 컴포넌트가 언마운트 될 때 AudioContext를 종료
      audioCtxRef.current?.close();
    };
  }, []);

  const onLoad = async ({ target: { result: buffer } }: any) => {
    if (shiftRef.current) {
      shiftRef.current.disconnect();
    }
    if (buffer) {
      const audioCtx = audioCtxRef.current;
      if (audioCtx) {
        const audioBuffer = await audioCtx.decodeAudioData(buffer);
        const myShift = new PitchShifter(audioCtx, audioBuffer, 16384);
        myShift.tempo = tempo;
        myShift.pitch = pitch;
        // setShift(myShift);
        shiftRef.current = myShift;
        if (isPlaying) {
          myShift.connect(audioCtx.destination);
          audioCtx.resume();
        }
      }
    }
  };

  // 저장되어있는 파일 사용하기
  const loadFile = async () => {
    try {
      const res = await fetch("/src/assets/sounds/꽃길.mp3");
      const buffer = await res.arrayBuffer();
      onLoad({ target: { result: buffer } });
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    loadFile();
    return () => {
      // 컴포넌트가 언마운트 될 때 PitchShifter를 해제
      if (shiftRef.current) {
        shiftRef.current.disconnect();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (shiftRef.current) {
      if (isPlaying) {
        shiftRef.current.disconnect();
      } else {
        shiftRef.current.connect(audioCtxRef.current!.destination);
        audioCtxRef.current!.resume();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChangePitch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPitch(value);
    if (shiftRef.current) {
      shiftRef.current.pitch = value;
    }
  };

  const handleChangeTempo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTempo(value);
    if (shiftRef.current) {
      shiftRef.current.tempo = value;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>컨트롤러!!!</h1>
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
      </div>
      <hr />
      <p>템포</p>
      <input
        type="range"
        onChange={handleChangeTempo}
        value={tempo}
        min="0.5"
        max="2"
        step="0.1"
      />
    </div>
  );
};

export default Controller;
