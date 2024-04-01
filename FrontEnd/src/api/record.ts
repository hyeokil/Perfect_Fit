import axios from "axios"
import { instance } from "./axios"

// 음성 녹음 후 서버에 전송
export const SendRecord = async (audio : File) => {
  let userId = 1002
  instance.get(`/api/v1/member/get`).then((res)=>{
    console.log(res)
    userId = res.data.dataBody.id
    // const userId = res.data.dataBody.id
  })
  console.log(audio)
  const formData = new FormData()
  formData.append('file', audio) 
  instance.post(`/api/v1/${userId}/record`, formData, {
    headers : {
      "Content-Type" : 'multipart/form-data',
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