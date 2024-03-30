import axios from "axios"
// 녹음 시작
// export const startRecord = () => {
//   const audioCtx = new AudioContext();
//   const makeSound = (stream: MediaStream) => {
//     const source = audioCtx.createMediaStreamSource(stream);
//     // setSource(source);
//   };

//   // 마이크 사용 권한
//   navigator.mediaDevices
//     .getUserMedia({ audio: true })
//     // 마이크 사용 권한 true 일때 실행
//     .then((stream: MediaStream) => {
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorder.start();
//       setStream(stream);
//       setMedia(mediaRecorder);
//       makeSound(stream);


//     })
//     .catch((err) => {
//       console.log(err);
//       window.alert("마이크 접근이 거절되었습니다. 설정에서 승인가능합니다.");
//       // 후에 이동할 페이지(메인 등) 으로 이동하기
//     });
//     return source
// };


// 음성 녹음 후 서버에 전송
export const SendRecord = (audio : File) => {
  console.log(audio)
  const formData = new FormData()
  formData.append('audioFile', audio) 
  axios.post(`url`, formData, {
    headers : {
      "Content-Type" : 'multipart/form-data'
    }
  })
  .then(res => console.log(res.data))
  .catch(error => console.error('파일전송 중 오류 발생 :', error))
}


export const SendVideo = (video : File) => {
  console.log(video)
  const formData = new FormData()
  formData.append('videoFile', video)
  axios.post(`url`, formData, {
    headers : {
      "Content-Type" : 'multipart/form-data'
    }
  })
  .then(res => console.log(res))
  .catch(err => console.error(err))

}