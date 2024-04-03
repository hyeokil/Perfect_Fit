import axios from "axios"
import { instance } from "./axios"
const userId = localStorage.getItem('userId')

// 음성 녹음 후 서버에 전송
export const SendRecord = async (audio : File) => {
  console.log(audio)
  const formData = new FormData()
  formData.append('file', audio) 
  instance.post(`/ai/${userId}/record/`, formData, {
    headers : {
      "Content-Type" : 'multipart/form-data',
    }
  })
  .then(res => console.log(res))
  .catch(error => {
    // console.error('파일전송 중 오류 발생 :', error)
    console.log(error)
  })
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