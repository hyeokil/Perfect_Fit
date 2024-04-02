import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PitchShifter } from "soundtouchjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import styles from "@styles/sing/Controller.module.scss";
import useRecordStore from "@/store/useRecordStore";
import useSaveStore from "@/store/useSaveStore";

type PropType = {
  setUserPitch : React.Dispatch<React.SetStateAction<number>>;
  setShowNoAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
  userPitch: number;
};

const Controller = (props: PropType) => {
  // -------------------------------------------------------
  const {setShowNoAlert, setShowSaveAlert, userPitch , setUserPitch } = props;
  const [pitch, setPitch] = useState<number>(userPitch);
  // const [tempo, setTempo] = useState<number>(1.0);
  const { isPlaying, setIsPlaying } = useRecordStore();
  const setMusicBlob = useRecordStore((state) => state.setMusicBlob);
  const setMusicUrl = useRecordStore((state) => state.setMusicUrl);
  const isRecording = useRecordStore((state) => state.isRecording);
  const setIsRecording = useRecordStore((state) => state.setIsRecording);
  // ----------------------------------------------------
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  // ----------------------------------------------------


const saveMusicBlob = useSaveStore(state => state.setMusicBlob)




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
        // myShift.tempo = tempo;
        myShift.pitch = pitch;
        shiftRef.current = myShift;
        if (isPlaying) {
          myShift.connect(audioCtx.destination);
          audioCtx.resume();
        }
        // 모니터링을 시작
        monitorPlayback(audioBuffer.duration);
      }
    }
  };

  const monitorPlayback = (duration: number) => {
    const checkEnded = () => {
      if (audioCtxRef.current && audioCtxRef.current.currentTime >= duration) {
        handleAudioEnded();
      } else {
        requestAnimationFrame(checkEnded);
      }
    };
    checkEnded();
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

  useEffect(() => {
    setPitch(userPitch);
    if (shiftRef.current) {
      shiftRef.current.pitch = userPitch;
    } // userPitch가 변경될 때마다 pitch state를 업데이트
  }, [userPitch]);

  // 오디오가 끝났을 때 할 작업
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setShowSaveAlert(true);
    console.log("오디오가 끝났습니다.");
  };

  const togglePlayback = () => {
    if (shiftRef.current) {
      if (isPlaying) {
        shiftRef.current.disconnect();
        stopRecording(); //--------------
        const recordedAudioLength = recordedBlobs.reduce(
          (totalLength, blob) => totalLength + blob.size,
          0
        );
  
        if (recordedAudioLength < 60 * 1000) {
          setShowNoAlert(true); // 녹음된 음성의 길이가 1분 미만일 때
        } else {
          setShowSaveAlert(true); // 녹음된 음성의 길이가 1분 이상일 때
        }
      } else {
        shiftRef.current.connect(audioCtxRef.current!.destination);
        audioCtxRef.current!.resume();
        startRecording(); //=--------------------
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleChangePitch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUserPitch(value)
    setPitch(value);
    if (shiftRef.current) {
      shiftRef.current.pitch = value;
    }
  };
  // const handleChangeTempo = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = parseFloat(e.target.value);
  //   setTempo(value);
  //   if (shiftRef.current) {
  //     shiftRef.current.tempo = value;
  //   }
  // };
  // -----------------------------------------------------------------
  // 오디오 녹음 시작

  const startRecording = () => {
    if (audioCtxRef.current) {
      const streamDestination =
        audioCtxRef.current.createMediaStreamDestination();
      if (shiftRef.current) {
        shiftRef.current.node.connect(streamDestination);
      }
      const recorder = new MediaRecorder(streamDestination.stream, {
        mimeType: "audio/webm",
      });
      setMedia(recorder);
      recorder.start();
      setIsRecording(true);
    }
  };
  const stopRecording = () => {
    if (media !== null) {
      media.ondataavailable = (e) => {
        const blob = new Blob([e.data], { type: "audio/webm" }); // Blob 생성
        console.log(blob);
        setRecordedBlobs((prevBlobs) => [...prevBlobs, blob]); // Blob 데이터 저장
        setMusicBlob(blob);
        saveMusicBlob(blob)
        const url: string = URL.createObjectURL(blob);
        console.log(url);
        setMusicUrl(url);
      };
      media.stop();
    }
  };
  useEffect(() => {
    if (isRecording === false) {
      setRecordedBlobs([]); // 녹음된 Blob 초기화
      setMusicUrl(null); // 음악 URL 초기화
      setIsRecording(false); // 녹음 상태를 false로 설정
    }
  }, [isRecording])

  return (
    <div className={styles.wrapper}>
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
        <h4>음정조절</h4>
        <input
          type="range"
          onChange={handleChangePitch}
          value={pitch}
          min="0.5"
          max="2"
          step="0.01"
        />
        <div className={styles.textbox}>
          <label>피치</label>
          <p>{pitch}</p>
          <p>
            {" "}
            {pitch >= 1.0 ? "+" : "-"}
            {Math.abs(100 - Math.round(pitch * 100))} %
          </p>
        </div>
      </div>
      {/* <div className={styles.controlbox}>
        <input
          type="range"
          onChange={handleChangeTempo}
          value={tempo}
          min="0.5"
          max="2"
          step="0.01"
        />
        <div>
          <p>{tempo}</p>
          <label>템포</label>
        </div>
      </div> */}
      {/* <hr />
      {recordedBlobs.map((blob, index) => (
        <audio key={index} controls src={URL.createObjectURL(blob)}></audio>
      ))}
      <hr /> */}
      {/* {musicUrl && <audio controls src={musicUrl}></audio>} */}
      {/* {videoUrl && <video controls src={videoUrl}></video>} */}
    </div>
  );
};

export default Controller;
