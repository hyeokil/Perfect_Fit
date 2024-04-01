import { SendVideo } from "@/api/record";
import useRecordStore from "@/store/useRecordStore";
import { useEffect, useRef, useState } from "react";

const SingRecorder = () => {
  const isPlaying = useRecordStore((state) => state.isPlaying)
  const setDisplayUrl = useRecordStore((state) => state.setDisplayUrl)
  const setDisplayBlob = useRecordStore((state) => state.setDisplayBlob)
  const displayBlob = useRecordStore((state) => state.displayBlob)
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  console.log(recordedBlobs)
  console.log(displayBlob)
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

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
    setDisplayBlob([])
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
        console.log(url)
        setVideoUrl(url);
        setDisplayUrl(url)
      };
      mediaRecorder.stop();
    } else {
      console.log("Recording not active");
    }
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      // console.log(event.data)
      setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
    }
  };

useEffect(() => {
  setDisplayBlob(recordedBlobs)
}, [recordedBlobs])

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

  useEffect(() => {
    if (isPlaying) {
      startRecord()
    }
    else {
      stopRecord()
    }
  }, [isPlaying])

  return (
    <div>
      {/* <button onClick={startRecord}>Start Recording</button>
      <button onClick={stopRecord}>Stop Recording</button>
      {videoUrl !== null && (
        <video controls src={videoUrl} width={"80%"}>
          Recorded Video
        </video>
      )}
      <hr />
      <button onClick={UploadFile}>파일 전송!!</button> */}
    </div>
  );
};

export default SingRecorder;
