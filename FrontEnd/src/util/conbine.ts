// export async function combineAudioAndVideo(videoBlob: Blob, audioBlob: Blob): Promise<Blob> {
//     // 각 Blob의 길이 가져오기
//     const videoDuration = await getMediaDuration(videoBlob, 'video');
//     const audioDuration = await getMediaDuration(audioBlob, 'audio');
  
//     // 긴 미디어의 길이를 녹화 시간으로 설정
//     const recordingDuration = Math.max(videoDuration, audioDuration) * 1000; // 밀리초로 변환
//   console.log(videoBlob)
//   console.log(audioBlob)
//   const videoStream = await blobToStream(videoBlob, 'video');
//   const audioStream = await blobToStream(audioBlob, 'audio');
//   console.log(videoStream)
//   console.log(audioStream)

//   audioStream.getAudioTracks().forEach(track => videoStream.addTrack(track));

//   return new Promise((resolve, reject) => {
//     const mediaRecorder = new MediaRecorder(videoStream);
//     const chunks: BlobPart[] = [];
//     var blob : Blob = null
//     mediaRecorder.ondataavailable = (event) => {
//       chunks.push(event.data);
//       blob = event.data
//     }
//     console.log(blob)
//     mediaRecorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
//     mediaRecorder.onerror = event => reject(event);
//     mediaRecorder.start();

//     // 예시로 설정된 녹화 시간, 실제로는 동영상의 길이에 맞게 조정해야 함
//     setTimeout(() => mediaRecorder.stop(), recordingDuration);
//   });
// }

// function blobToStream(blob: Blob, type: 'video' | 'audio'): Promise<MediaStream> {
//   return new Promise((resolve, reject) => {
//     const url = URL.createObjectURL(blob);
//     const media = document.createElement(type) as HTMLMediaElement & {
//       captureStream?: () => MediaStream;
//     };
//     media.src = url;

//     media.onloadedmetadata = () => {
//       if (media.captureStream) {
//         resolve(media.captureStream());
//       } else {
//         reject(new Error('captureStream 메서드를 지원하지 않는 브라우저입니다.'));
//       }
//       URL.revokeObjectURL(url);
//     };

//     media.onerror = () => {
//       reject(new Error('미디어 스트림을 로드하는 데 실패했습니다.'));
//       URL.revokeObjectURL(url);
//     };
//   });
// }


// // Blob에서 재생 길이를 가져오는 함수
// function getMediaDuration(blob: Blob, type: 'video' | 'audio'): Promise<number> {
//   return new Promise((resolve, reject) => {
//     const url = URL.createObjectURL(blob);
//     const media = document.createElement(type) as HTMLMediaElement;
//     media.src = url;

//     media.onloadedmetadata = () => {
//       resolve(media.duration);
//       URL.revokeObjectURL(url);
//     };

//     media.onerror = () => {
//       reject(new Error('미디어 길이를 가져오는 데 실패했습니다.'));
//       URL.revokeObjectURL(url);
//     };
//   });
// }

import VideoStreamMerger from 'video-stream-merger';

// videoBlob과 audioBlob은 이미 녹화가 완료된 Blob 객체입니다.

async function combineAudioAndVideo(videoBlob: Blob, audioBlob: Blob): Promise<Blob> {
  const videoStream = videoBlobToStream(videoBlob);
  const audioStream = audioBlobToStream(audioBlob);

  // Merger 인스턴스 생성
  const merger = new VideoStreamMerger({
    width: 1280,  // 최종 비디오의 너비
    height: 720,  // 최종 비디오의 높이
    fps: 25,      // 프레임레이트
  });

  // 비디오 스트림 추가
  merger.addStream(videoStream, {
    x: 0, // x 좌표 위치
    y: 0, // y 좌표 위치
    width: merger.width,
    height: merger.height,
    mute: true // 비디오의 오디오를 뮤트 (오디오 스트림을 별도로 추가하기 때문)
  });

  // 오디오 스트림 추가
  merger.addStream(audioStream, {
    x: 0, // 오디오는 위치가 필요 없음
    y: 0, // 오디오는 위치가 필요 없음
    width: merger.width,
    height: merger.height,
    mute: false // 오디오는 뮤트하지 않음
  });

  // 병합 시작
  merger.start();

  // 병합된 스트림을 녹화할 준비
  const mixedStream = merger.result;
  const recorder = new MediaRecorder(mixedStream);
  const chunks: BlobPart[] = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = event => chunks.push(event.data);
    recorder.onstop = () => resolve(new Blob(chunks, { type: 'video/webm' }));
    recorder.onerror = event => reject(event);
    recorder.start();

    // 녹화 종료를 위해 별도의 로직이 필요합니다. 예를 들면,
    // 병합된 스트림의 길이를 알고 있다면 해당 길이만큼 기다렸다가 멈출 수 있습니다.
    // setTimeout(() => recorder.stop(), recordingDuration); // recordingDuration은 미리 계산해야 함
  });
}

function videoBlobToStream(blob: Blob): MediaStream {
  const url = URL.createObjectURL(blob);
  const video = document.createElement('video');
  video.src = url;

  return video.captureStream();
}

function audioBlobToStream(blob: Blob): MediaStream {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);

  return audio.captureStream();
}
