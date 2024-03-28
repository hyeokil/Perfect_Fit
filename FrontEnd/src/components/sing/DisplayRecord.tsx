import { useEffect, useState } from 'react';

const DisplayRecord = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);

  const [videoUrl, setVideoUrl] = useState<string | null >(null)
  // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const getMedia = async () => {
    const options = {
      video : true,
      audio : true
    }
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({audio : true})
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(options)

      const mixedStream = new MediaStream()

      audioStream.getAudioTracks().forEach((track) => mixedStream.addTrack(track));
      mediaStream.getVideoTracks().forEach((track) => mixedStream.addTrack(track));

      setStream(mixedStream)
    }
    catch (err) {
      console.log(`Error : ${err}`)
    }
  }

  const StartRecord = () => {
    setRecordedBlobs([]);
    try {
      const media = new MediaRecorder(stream as MediaStream, {
        mimeType : "video/webm"
      })
      media.start()
      setMediaRecorder(media)

    }
    catch(err) {
      console.log(err)
    }
  }

  const StopRecord = () => {
    if (mediaRecorder !== null) {
      mediaRecorder.ondataavailable = (e) => {
        const url : string = URL.createObjectURL(e.data)
        console.log(url)
        setVideoUrl(url)
        }
    }
    else {
      console.log('녹음 ㄴㄴ')
    }
    mediaRecorder?.stop()
  }

  useEffect(() => {
    //stream 상태가 null인 경우, 즉 아직 미디어 스트림이 설정되지 않았을 때 getMedia 함수를 호출
    if (!stream) {
      void getMedia();
    }
    // return 함수는 컴포넌트의 언마운트 작업을 수행하기 위해 사용 ,
    // return () => { ... } 이 로직은 컴포넌트가 언마운트되기 전에 실행되며, stream 상태에 할당된 미디어 스트림의 각 트랙을 중지(stop())합니다.
    // 해당 함수는 stream을 더이상 사용하지 않아야 할때, stream 연결을 종료하기 위해 사용
    // 즉 컴포넌트가 DOM에서 제거될 때 useEffect 내의 정리 함수가 실행됩니다. 
    // 이때 미디어 스트림의 트랙들을 중지시키는 작업을 통해 자원을 해제하고 필요한 경우가 아니라면 카메라를 종료하여 좀더 신뢰가 가는 UX를 지원
    return () => {
      if (stream) {
        stream?.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);



  return (
    <div>
      {/* <iframe src='https://www.youtube.com/embed/OvIk6BDkVE4' /> */}
      <button onClick={StartRecord}>녹화 시작</button>
      <button onClick={StopRecord}>녹화 중지</button>
      {/* <audio src='/src/assets/sounds/Claude Debussy-01-Debussy _ Clair De Lune-128.mp3' controls /> */}
      {videoUrl !== null
    &&
    <video controls src={videoUrl} width={'80%'}>ㄷ없어</video>}
    </div>
  );
};

export default DisplayRecord;