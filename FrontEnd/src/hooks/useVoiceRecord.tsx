import { useEffect, useState } from "react";

const useVoiceRecord = (isRecording:boolean) => {
  // const [isRecording, setIsRecording] = useState<boolean>(state)
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
  const [recordBlob, setRecordBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const startRecord = () => {
    setRecordBlob(null);
    const audioCtx = new AudioContext();
    const makeSound = (stream: MediaStream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
    }; 
    navigator.mediaDevices.getUserMedia({audio:true})
    .then((stream : MediaStream) => {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.start()
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
    })
    .catch((err) => {
      console.log(err);
      window.alert("마이크 접근이 거절되었습니다. 설정에서 승인가능합니다.");
      // 후에 이동할 페이지(메인 등) 으로 이동하기
    });
  }

  const stopRecord = () => {
    if (media !== null) {
      media.ondataavailable = function (e) {
        setRecordBlob(e.data)
        const url : string = URL.createObjectURL(e.data);
        setUrl(url);
        // setOnRec(true)
      };
    } else {
      console.log("녹음 안됐음");
    }
    // 모든 트랙에서 stop 호출해 오디오 스트림 정지
    stream?.getAudioTracks().forEach(function (track) {
      track.stop;
    });
    
    media?.stop();
    
    source?.disconnect();
  }
  
  useEffect(() => {
    if (isRecording === true) {
      startRecord()
    }
    else{
      stopRecord()
    }
  }, [isRecording])

  return{
    recordBlob,
    url
  }
};

export default {useVoiceRecord};
