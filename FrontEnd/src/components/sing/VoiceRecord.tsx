import useRecordStore from "@/store/useRecordStore";
import useSaveStore from "@/store/useSaveStore";
import { useEffect, useState} from "react";

const VoiceRecord = () => {
  const isPlaying = useRecordStore((state) => state.isPlaying);
  const setVoiceUrl = useRecordStore((state) => state.setVoiceUrl);
  const setVideoUrl = useRecordStore((state) => state.setVideoUrl);
  const setMusicBlob = useRecordStore((state) => state.setMusicBlob);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
  const saveVoiceBlob = useSaveStore(state => state.setVoiceBlob)
  const saveVideoBlob = useSaveStore(state => state.setVideoBlob)
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
        setMusicBlob(e.data);
        saveVideoBlob(null)
        saveVoiceBlob(e.data)

        const url: string = URL.createObjectURL(e.data);
        setVoiceUrl(url);
        setVideoUrl(null);
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

  useEffect(() => {
    if (isPlaying === true) {
      startRecord();
    } else {
      offRecord();
    }
  }, [isPlaying]);

  return (
    <div>
    </div>
  );
};

export default VoiceRecord;
