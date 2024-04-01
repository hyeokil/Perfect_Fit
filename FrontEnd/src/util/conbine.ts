import { createFFmpeg } from '@ffmpeg/ffmpeg';

export async function mixAudioAndVideo(videoBlobs: Blob[], audioBlob: Blob): Promise<Blob> {
  const ffmpegInstance = createFFmpeg({ log: true });
  await ffmpegInstance.load();

  for (let i = 0; i < videoBlobs.length; i++) {
    ffmpegInstance.FS('writeFile', `video_${i}.mp4`, await fetchFile(videoBlobs[i]));
  }

  ffmpegInstance.FS('writeFile', 'audio.mp3', await fetchFile(audioBlob));

  const inputs = videoBlobs.map((_, i) => `-i video_${i}.mp4`).join(' ');
  await ffmpegInstance.run(`${inputs} -i audio.mp3 -filter_complex [0:a][1:a]amix=inputs=${videoBlobs.length + 1}[aout] -map 0:v -map [aout] -c:v copy -c:a aac -strict experimental output.mp4`);

  const outputData = ffmpegInstance.FS('readFile', 'output.mp4');
  const outputBlob = new Blob([outputData.buffer], { type: 'video/mp4' });
  
  return outputBlob;
}

function fetchFile(blob: Blob): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(new Uint8Array(event.target.result as ArrayBuffer));
    };
    reader.readAsArrayBuffer(blob);
  });
}
