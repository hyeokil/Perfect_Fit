import { create } from "zustand";

type MusicStoreType = {
  albumUrl: string; // 선택한 노래 앨범 커버
  singer: string;
  title: string;
  setUrl: (url: string) => void;
};

export const useMusicStore = create<MusicStoreType>((set) => ({
  albumUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMByl9FTvkIdZ9sxJZsC0PhMLIADuQY_Q3kbM7Ms1HKE3esEdIyUZcOAaisQ&s",
  singer: "문땅훈",
  title : '바보',
  setUrl: (url: string) => set(() => ({ albumUrl: url })),
}));
