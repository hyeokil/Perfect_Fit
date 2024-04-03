import { instance } from "./axios";
const userId = localStorage.getItem('userId')

export const getSingleVideo = async () => {
  return await instance.get(`/api/v1/single/list`)
}