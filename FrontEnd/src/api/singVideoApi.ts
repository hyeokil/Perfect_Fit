import { instance } from "./axios";


// 싱글모드 영상 저장
export const singleVideoSave =async (params : {}) => {
  // const data = 
  return await instance.post(`/api/v1/single/create/${songId}`) 
}