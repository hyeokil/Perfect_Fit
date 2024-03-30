import { SendVideo } from "@/api/record";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SingRecorder = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  console.log(recordedBlobs)
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null)

  const getMedia = async () => {
    const options = {
      // video: true,
      audio: true,
      preferCurrentTab:true
    };

    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
      setStream(mediaStream);

      // mediaStream.getVideoTracks().forEach(track => mixedStream.addTrack(track));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  const startRecord = () => {
    setRecordedBlobs([]);
    try {
      const media = new MediaRecorder(stream as MediaStream, {
        mimeType: "video/webm",
      });
      media.ondataavailable = handleDataAvailable
      media.start();
      setMediaRecorder(media);
    } catch (err) {
      console.log(err);
    }
  };

  const stopRecord = () => {
    if (mediaRecorder !== null) {
      mediaRecorder.ondataavailable = (e) => {
        if(e.data.size > 0) {
          setRecordedBlobs((prevBlobs) => [...prevBlobs, e.data])
        }
        // const blob = new Blob(recordedBlobs)
        const url: string = URL.createObjectURL(e.data);
        setVideoUrl(url);
      };
      mediaRecorder.stop();
    } else {
      console.log("Recording not active");
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      console.log(event.data)
      setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
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

  const UploadFile = () => {
    console.log(`업로드 파일 ${recordedBlobs}`)
    if (recordedBlobs) {
      const videoBlob = new Blob(recordedBlobs, {type : 'mimeType'})
      console.log(videoBlob)
      const video : File  = new File([videoBlob], `songName.mp4`, {
        type : "video/mp4"
      })
      SendVideo(video)
    }
  }

  return (
    <div>
      <iframe src='https://www.youtube.com/embed/OvIk6BDkVE4' />

      <button onClick={startRecord}>Start Recording</button>
      <button onClick={stopRecord}>Stop Recording</button>
      {videoUrl !== null && (
        <video controls src={videoUrl} width={"80%"}>
          Recorded Video
        </video>
      )}
      <hr />
      <button onClick={UploadFile}>파일 전송!!</button>
    </div>
  );
};

export default SingRecorder;
