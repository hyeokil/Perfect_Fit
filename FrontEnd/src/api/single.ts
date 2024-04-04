import { instance } from "./axios";
// const userId = localStorage.getItem('userId')

export const getSingleVideo = async () => {
  return await instance.get(`/api/v1/single/list`)
}



// 듀엣이 완성된 나의 노래 조회
export const getDuetVideo =async () => {
  return await instance.get(`/api/v1/duet/finished/myList`)
  
}

//미완성 듀엣
export const getUnfinishedDuet =async () => {
  return await instance.get(`/api/v1/duet/unfinished/myList`)
}