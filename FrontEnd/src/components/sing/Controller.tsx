import { PitchShifterType } from "@/types/soundtouch";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PitchShifter } from "soundtouchjs";

const Controller = () => {
  // -------------------------------------------------------
  const [pitch, setPitch] = useState<number>(1.0);
  const [tempo, setTempo] = useState<number>(1.0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [shift, setShift] = useState<any>(null);
  const audioCtx = new AudioContext();
  const gainNode = audioCtx.createGain();
  const state = audioCtx.state;
  console.log(pitch)
  console.log('오디오 상태 : ' , state)

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
        setShift(myShift);
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


  const newShifter = (buffer) => {
    const myShift = new PitchShifter(audioCtx, buffer, 16384);
    setShift(myShift);
    myShift.tempo = tempo;
    myShift.pitch = pitch;
    myShift.connect(audioCtx.destination);

  };

  useEffect(() => {
    setShift(null)
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



  return (
    <div>
      <h1>컨트롤러!!!</h1>
      <button onClick={togglePlayback}>
        {isPlaying ? "일시정지" : "재생"}
      </button>
      <label>피치</label>
      <input
        type="range"
        onChange={handleChangePitch}
        value={pitch}
        min="0.5"
        max="2"
        step="0.01"
      />
    </div>
  );
};

export default Controller;
