import { useEffect, useRef, useState } from "react";
import styles from "@styles/sing/Camera.module.scss";
import { logOnDev } from "@/util/logging";
import useRecordStore from "@/store/useRecordStore";
import useSaveStore from "@/store/useSaveStore";

const Camera = () => {
  // 노래 시작을 알려주는 상태!
  const isPlaying = useRecordStore((state) => state.isPlaying);
  const setVideoUrl = useRecordStore((state) => state.setVideoUrl);
  const setVoiceUrl = useRecordStore((state) => state.setVoiceUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  // mediastream
  const [stream, setStream] = useState<MediaStream | null>(null);
  console.log(stream)

  // 녹화 여부 확인
  const [recording, setRecording] = useState(false);
  // 녹화 결과물
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  // 녹화 기능 수행
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // 녹화 결과물 
  const saveVideoBlob = useSaveStore(state => state.setVideoBlob)

  const startCamera = () => {
    logOnDev("카메라 켜짐");
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(`Error 발생`, err);
      });
  };

  useEffect(() => {
    if (!stream) {
      startCamera();
    }
    return () => {
      if (stream) {
        stream?.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (isPlaying === true) {
      handlStartVideoRecord();
    }
    if (isPlaying === false) {
      handlStopVideoRecord();
    }
  }, [isPlaying]);

  const handlStartVideoRecord = () => {
    // setRecordedBlobs([]);
    try {
      mediaRecorderRef.current = new MediaRecorder(stream as MediaStream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          // setRecordedBlobs((prev) => [...prev, e.data]);
          setVideoBlob(e.data)
          saveVideoBlob(e.data)
        }
        const url: string = URL.createObjectURL(e.data);
        
        console.log(url);
        setVideoUrl(url);
        setVoiceUrl(null);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.log("녹화 에러");
    }
  };
  const handlStopVideoRecord = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      // setVideoBlob(recordedBlobs);
    }
  };

  // const goS3 = () => {
  //   console.log(typeof videoBlob);
  //   console.log(videoBlob);
  //   if (videoBlob) {
  //     S3Upload(videoBlob);
  //   }
  // };

  return (
    <div>
      {/* <button onClick={goS3}>전송,,,,</button> */}
      <video autoPlay muted ref={videoRef} className={styles.video}></video>
    </div>
  );
};

export default Camera;
