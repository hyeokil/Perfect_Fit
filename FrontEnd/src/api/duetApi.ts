import { instance } from "./axios";
const userId = localStorage.getItem('userId')

export const getReelsList = async () => {
  return await instance.get(`/recommendations/reels/${userId}`)}

export const getDuetNoPartList =async () => {
  return await instance.get(`/api/v1/duet/unfinished/list`)
}