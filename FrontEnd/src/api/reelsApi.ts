import { videoInfoType } from "@/types/apiType";
import { instance } from "./axios";
const userId = localStorage.getItem('userId')

export const getReelsList = async () => {
  return await instance.get(`/recommendations/${userId}`)}

  
  //릴스 생성
export const createReels = async (videoInfo:videoInfoType) => {
  return await instance.post(`/api/v1/reels/create` ,videoInfo)
}