// type OptionType = {
//   audio? : boolean
//   video? : boolean
// }

// 마이크 권한 허용
export const getSoundMedia = async (): Promise<MediaStream | null> => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return mediaStream;
  } catch (err) {
    throw new Error();
  }
};

// 마이크 및 카메라 권한 허용
export const getMedia = async (): Promise<MediaStream | null> => {
  const options = {
    video: true,
    audio: true,
  };
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
    return mediaStream;
  } catch (err) {
    throw new Error();
  }
};


export const createMicrophoneVolumeMonitor = (
  stream: MediaStream,
  volumeCallback: React.Dispatch<React.SetStateAction<number>>
) => {
  const audioContext = new AudioContext();
  const sourceNode = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  analyser.fftSize = 2048;

  // 소스 노드를 분석기에 연결하고 PCM 데이터를 저장할 배열을 생성합니다.
  sourceNode.connect(analyser);
  const pcmData = new Float32Array(analyser.fftSize);

  let intervalId: NodeJS.Timer | number;

  // 모니터링 시작!!

  const startMonitoring = () => {
    // 주기적으로 볼륨을 체크 => 마이크 상태를 반환
    intervalId = setInterval(() => {
      analyser.getFloatTimeDomainData(pcmData);

      const sumSquares = pcmData.reduce((sum, value) => sum + value * value, 0);
      const rms = Math.sqrt(sumSquares / pcmData.length);

      // 볼륨 증폭 가중치 설정
      const weight = 7;
      const amplifiedVolume = rms * weight;

      // 볼륨을 0에서 100 사이로 정규화
      const normalizedVolume = Math.min(Math.round(amplifiedVolume * 100), 100);

      // 볼륨 업데이트 함수 실행
      volumeCallback(normalizedVolume);
    }, 150);
  };
  // 모니터링 중지
  const stopMonitoring = () => {
    //인터벌 타이머 설정 있으면 해제
    if (intervalId) {
      clearInterval(intervalId as number);
    }

    sourceNode.disconnect();
    analyser.disconnect();
    void audioContext.close();
  };

  return { startMonitoring, stopMonitoring };
};
