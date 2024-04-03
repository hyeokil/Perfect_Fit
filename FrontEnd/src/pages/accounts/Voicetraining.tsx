// import { SendRecord } from "@/api/record";
import { useEffect, useState } from "react";
import Stepper from "@/components/accounts/Stepper";
import "@styles/accounts/Voicetraining.scss";
import { getSoundMedia } from "@/util/record";
import VolumeStatus from "@components/record/VolumeStatus";
// import { useNavigate } from "react-router-dom";
import Script from "@/components/record/Script";
import S3test from "../Test";
// import { instance } from "@/api/axios";

const Voicetraining: React.FC = () => {
  const userId = localStorage.getItem("userId");

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
  // const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
  // const [url, setUrl] = useState<string | null>(null);
  const [state, setState] = useState<boolean>(false);
  // const navigate = useNavigate();
  const [isTrackingStarted, setIsTrackingStarted] = useState(false);
  console.log(isTrackingStarted);
  // 녹음 시작 버튼
  const startRecord = async () => {
    try {
      const audioCtx = new AudioContext();
      const makeSound = (stream: MediaStream) => {
        const source = audioCtx.createMediaStreamSource(stream);
        setSource(source);
      };

      const stream = await getSoundMedia();
      if (stream) {
        setStream(stream);
        const mediaRecorder = new MediaRecorder(stream);
        setMedia(mediaRecorder);
        mediaRecorder.start();
        console.log("미디어 레코더 설정:", mediaRecorder);
        makeSound(stream);
        setState(true);
        setIsTrackingStarted(true); // 가사 트래킹 시작
        // 60초 후에 녹음 자동 종료
      } else {
        console.log("스트림이 없음");
      }
    } catch (err) {
      console.error("녹음 시작 과정에서 오류 발생", err);
    }
  };

  useEffect(() => {
    if (media) {
      console.log("미디어 레코더 상태 변경됨:", media);

      const timer = setTimeout(() => {
        console.log("타이머 완료, 녹음 중지 시도");
        stopRecord();
      }, 60000); // 10초 후 종료

      return () => clearTimeout(timer);
    }
  }, [media]);

  const stopRecord = () => {
    console.log("녹음 중지 시도");
    if (media) {
      console.log("미디어 상태:", media.state);

      try {
        media.ondataavailable = async function (e) {
          console.log("녹음 데이터 사용 가능", e.data);
          // setAudioUrl(e.data);
          await handleUpload(e.data);
        };

        if (media.state === "recording") {
          media.stop();
          console.log("미디어 레코더 중지");
        } else {
          console.log("미디어 레코더는 이미 중지됨");
        }

        stream?.getAudioTracks().forEach((track) => track.stop());
        console.log("오디오 트랙 중지");

        source?.disconnect();
        console.log("오디오 소스 연결 해제");

        setState(true);
      } catch (err) {
        console.error("녹음 중지 과정에서 오류 발생", err);
      }
    } else {
      console.log("미디어 레코더가 설정되지 않음");
    }
  };
  const handleUpload = async (data: Blob) => {
    try {
      await UploadFile(data);
      if (window.confirm("녹음이 완료되었습니다. 다음으로 넘어가시겠습니까?")) {
        // navigate("/mainchart");
      }
    } catch (error) {
      console.error("UploadFile 실행 중 오류 발생:", error);
    }
  };
  // const UploadFile = async (data: Blob) => {
  //   const sound: File = new File([data], `${userId}.wav`, {
  //     lastModified: new Date().getTime(),
  //     type: "audio/wav",
  //   });
  //   await SendRecord(sound);
  // };
  const UploadFile = async (data: Blob) => {
    try {
      const sound: File = new File([data], `${userId}.wav`, {
        lastModified: new Date().getTime(),
        type: "audio/wav",
      });
  
      // S3test 함수를 사용하여 오디오 파일을 S3에 업로드
      const s3Url = await S3test(sound);
      console.log("S3에 업로드된 파일 URL:222", s3Url);
      // 필요한 경우 추가 처리
      // await SendRecord(sound);
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };
  

  return (
    <div className="voicetraining-container">
      <Stepper currentStep={3} />
      <div className="voice-header">
        <h2>내 목소리 학습하기</h2>
      </div>
      <div className="voice-mic">
        <img src="/icon/Record.png" alt="마이크1" />
        <h3>음색 검사 절차 및 유의 사항</h3>
        <p>1. 조용한 환경에서 녹음을 실시합니다.</p>
        <p>2. 녹음시작을 클릭하고 아래 제시된 노래를 부릅니다.</p>
        <p>3. 중간 제출을 원하는 경우 녹음 완료 버튼을 누릅니다.</p>
        <Script isTrackingStarted={isTrackingStarted} />
      </div>
      {stream && <VolumeStatus media={stream} />}
      {state ? (
        <button className="voice-button" onClick={stopRecord}>
          녹음정지
        </button>
      ) : (
        <button className="voice-button" onClick={startRecord}>
          녹음시작
        </button>
      )}
    </div>
  );
};

export default Voicetraining;
