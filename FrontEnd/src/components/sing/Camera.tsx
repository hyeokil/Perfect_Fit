import { useEffect, useRef } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = () => {
    console.log('??')
    navigator.mediaDevices.getUserMedia({audio : true, video: true})
    .then((stream) => {
      if(videoRef.current) {
        videoRef.current.srcObject = stream
      }
    })
    .catch(err => {
      console.error(`Error 발생`, err)
    })
  }

  useEffect(() => {
    startCamera()
  })

  return (
    <div>
      {/* <button onClick={() => startCamera()}>녹화 시작@</button> */}
      <video autoPlay muted ref={videoRef} width='100%' height='80%' style={{transform : 'scaleX(-1)'}} ></video>
    </div>
  );
};

export default Camera;