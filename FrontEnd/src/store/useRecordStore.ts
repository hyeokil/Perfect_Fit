import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecordType = {
  isPlaying: boolean;
  isRecording: boolean;
  videoBlob: Blob[];
  displayBlob: Blob[];
  musicBlob: Blob | null;
  videoUrl: string | null;
  musicUrl: string | null;
  displayUrl: string | null;
  resetRecord: boolean | null;
  setResetRecord: (resetRecord: boolean) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsRecording: (isRecording: boolean) => void;
  setVideoBlob: (videoBlob: Blob[]) => void;
  setDisplayBlob: (displayBlob: Blob[]) => void;
  setMusicBlob: (musicBlob: Blob | null) => void;
  setVideoUrl: (videoUrl: string | null) => void;
  setMusicUrl: (musicUrl: string | null) => void;
  setDisplayUrl: (displayUrl: string | null) => void;
};

const useRecordStore = create(
  persist<RecordType>(
    (set) => ({
      // true => reset false => reset x
      resetRecord: true,
      isPlaying: false,
      isRecording: false,
      videoBlob: [],
      displayBlob: [],
      musicBlob: null,
      videoUrl: null,
      musicUrl: null,
      displayUrl: null,
      setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
      setMusicUrl: (musicUrl: string | null) => set({ musicUrl }),
      setVideoUrl: (videoUrl: string | null) => set({ videoUrl }),
      setDisplayUrl: (displayUrl: string | null) => set({ displayUrl }),
      setIsRecording: (isRecording: boolean) => set({ isRecording }),
      setResetRecord: (resetRecord: boolean) => set({ resetRecord }),
      setVideoBlob: (videoBlob: Blob[]) => set({ videoBlob }),
      setDisplayBlob: (displayBlob: Blob[]) =>
        set((state) => ({ ...state, displayBlob })),
      setMusicBlob: (musicBlob: Blob | null) => set({ musicBlob }),
    }),
    {
      name: "recordStorage",
    }
  )
);

export default useRecordStore;
