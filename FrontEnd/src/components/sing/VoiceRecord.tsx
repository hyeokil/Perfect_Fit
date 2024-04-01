import { SendRecord } from "@/api/record";
import useRecordStore from "@/store/useRecordStore";
import { useEffect, useState, useCallback } from "react";

const VoiceRecord = () => {
  const isPlaying = useRecordStore((state) => state.isPlaying);
  const setVoiceUrl = useRecordStore((state) => state.setVoiceUrl);
  const setVideoUrl = useRecordStore((state) => state.setVideoUrl);
  const setMusicBlob = useRecordStore((state) => state.setMusicBlob);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
  const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  // 녹음 시작 버튼
  const startRecord = () => {
    const audioCtx = new AudioContext();
    const makeSound = (stream: MediaStream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
    };

    // 마이크 사용 권한
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      // 마이크 사용 권한 true 일때 실행
      .then((stream: MediaStream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);
      })
      .catch((err) => {
        console.log(err);
        window.alert("마이크 접근이 거절되었습니다. 설정에서 승인가능합니다.");
        // 후에 이동할 페이지(메인 등) 으로 이동하기
      });
  };

  // 녹음 중지
  const offRecord = () => {
    if (media !== null) {
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
        setMusicBlob(e.data);
        const url: string = URL.createObjectURL(e.data);
        setUrl(url);
        setVoiceUrl(url);
        setVideoUrl(null);
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
  };

//   useEffect(() => {
//     if (audioUrl) {
//       setVideoUrl()
// }}, [audioUrl]);

  // const play = useCallback(() => {
  //   if (url) {
  //     const audio = new Audio(url);
  //     audio.play();
  //     console.log("되고 있는거 마즌?");
  //   }
  // }, [url]);

  // const UploadFile = () => {
  //   if (audioUrl !== null) {
  //     const sound : File = new File([audioUrl] , "userAudio.wav", {
  //       lastModified: new Date().getTime(),
  //       type : "audio/wav"
  //     })
  //     SendRecord(sound)
  //   }
  //   else {
  //     window.alert('녹음이 완료되지 않았습니다.')
  //   }

  // };

  useEffect(() => {
    if (isPlaying === true) {
      startRecord();
    } else {
      offRecord();
    }
  }, [isPlaying]);

  return (
    <div>
      {/* <h1>ㅎㅇㅎㅇ</h1>
      <button onClick={startRecord}>녹음!!</button>
      <button onClick={offRecord}>녹음 중ㅈ지</button>
      <button onClick={play}>재생</button>
      <button onClick={UploadFile}>파일 저장</button>
      <p>{url}</p> */}
      {/* {url !== null && (
        <audio src={url} controls>
          사용할 수 있는 오디오가 업습니다.ㅇ//
        </audio>
      )} */}
    </div>
  );
};

export default VoiceRecord;
