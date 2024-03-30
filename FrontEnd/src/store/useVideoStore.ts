import { create } from "zustand";


type SingVideoType = {
  videourl : string
  setVideoUrl : (url:string) => void
}

export const useVideoStore = create<SingVideoType>((set) => ({
  videourl : 'aaa',
  setVideoUrl : (url : string) => set(() => ({videourl : url}))
}))