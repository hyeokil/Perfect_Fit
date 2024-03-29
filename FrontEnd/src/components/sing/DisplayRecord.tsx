import { useEffect, useState } from 'react';

const DisplayRecord = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const getMedia = async () => {
    const options = {
      video: true,
      audio: true
    };

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setStream(mediaStream);
      setAudioStream(audioStream);

      const mixedStream = new MediaStream();
      audioStream.getAudioTracks().forEach(track => mixedStream.addTrack(track));
      mediaStream.getVideoTracks().forEach(track => mixedStream.addTrack(track));

      setStream(mixedStream);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const startRecord = () => {
    setRecordedBlobs([]);
    try {
      const media = new MediaRecorder(stream as MediaStream, {
        mimeType: "video/webm"
      });
      media.start();
      setMediaRecorder(media);
    } catch(err) {
      console.log(err);
    }
  };

  const stopRecord = () => {
    if (mediaRecorder !== null) {
      mediaRecorder.ondataavailable = (e) => {
        const url: string = URL.createObjectURL(e.data);
        setVideoUrl(url);
      };
      mediaRecorder.stop();
    } else {
      console.log('Recording not active');
    }
  };

  useEffect(() => {
    if (!stream) {
      getMedia();
    }

    return () => {
      if (stream) {
        stream?.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div>
      <iframe src='https://www.youtube.com/embed/OvIk6BDkVE4' />
      {/* <audio src='/src/assets/sounds/꽃길.mp3' controls autoPlay></audio> */}
      <button onClick={startRecord}>Start Recording</button>
      <button onClick={stopRecord}>Stop Recording</button>
      {videoUrl !== null &&
        <video controls src={videoUrl} width={'80%'}>Recorded Video</video>
      }
    </div>
  );
};

export default DisplayRecord;
