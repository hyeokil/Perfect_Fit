import { create } from "zustand";
import { persist } from "zustand/middleware";
type MusicStoreType = {
  info: {
    songId : number
    songTitle: string;
    artist: string;
    genre: string;
    songUrl: string;
    songThumbnail: string;
    songReleaseDate: string;
    songLength: string;
    myListDisplay: boolean;
    songPitch : number | null
    songView: number;
  };
  setInfo: (newInfo: MusicStoreType["info"]) => void;
};

export const useMusicStore = create(
  persist<MusicStoreType>(
    (set) => ({
      info: {
        songId : 28062,
        songTitle: "작은 것들을 위한 시(Boy With Luv)(Feat.Halsey)...",
        artist: "방탄소년단",
        genre: "알앤비",
        songUrl: "https://www.youtube.com/watch?v=VdCR9YvB5dM",
        songThumbnail:
          "https://cdn.music-flo.com/image/album/797/591/02/04/402591797_5caffbab.jpg?1555037100496/dims/resize/500x500/quality/90",
        songReleaseDate: "20190412",
        songLength: "3:49",
        myListDisplay: false,
        songPitch : null,
        songView: 1757237231,
      },
      setInfo: (newInfo) => set({ info: newInfo }),
    }),
    {
      name: "music-store", // unique name of the store
      getStorage: () => sessionStorage,
    }
  )
);
