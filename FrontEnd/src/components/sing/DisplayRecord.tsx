import { useEffect, useState } from 'react';

const DisplayRecord = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const getMedia = async () => {
    const displayOptions = {
      video: true,
      audio: true
    };

    const audioOptions = {
      audio: true
    };

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia(displayOptions);
      const audioStream = await navigator.mediaDevices.getUserMedia(audioOptions);
      // setStream(displayStream)
      const mixedStream = new MediaStream();
      audioStream.getAudioTracks().forEach(track => mixedStream.addTrack(track));
      displayStream.getTracks().forEach(track => mixedStream.addTrack(track));

      setStream(mixedStream);
      // setAudioStream(audioStream);
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
      media.ondataavailable = handleDataAvailable;
      media.start();
      setMediaRecorder(media);
    } catch(err) {
      console.log(err);
    }
  };

  const stopRecord = () => {
    if (mediaRecorder !== null) {
      mediaRecorder.stop();
    } else {
      console.log('Recording not active');
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
    }
  };

  useEffect(() => {
    if (!stream) {
      getMedia();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (recordedBlobs.length > 0) {
      const blob = new Blob(recordedBlobs, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    }
  }, [recordedBlobs]);

  return (
    <div>
      <iframe src='https://www.youtube.com/embed/OvIk6BDkVE4' />
      <button onClick={startRecord}>Start Recording</button>
      <button onClick={stopRecord}>Stop Recording</button>
      {videoUrl !== null &&
        <video controls src={videoUrl} width={'80%'}>Recorded Video</video>
      }
    </div>
  );
};

export default DisplayRecord;
