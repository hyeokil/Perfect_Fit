import { DuetListData, Song } from "@/types/apiType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SongStore {
  selectedSong: Song | null;
  setSelectedSong: (song: Song | null) => void;
}

export const useSongStore = create(
  persist<SongStore>(
    (set) => ({
      selectedSong: null,
      setSelectedSong: (song) => set({ selectedSong: song }),
    }),
    {
      name: "selectdSong",
      getStorage: () => sessionStorage,
    }
  )
);

type duetStore = {
  duetData: DuetListData | null;
  setDuetData: (data: DuetListData | null) => void;
};
export const useDuetStore = create(
  persist<duetStore>(
    (set) => ({
      duetData: null,
      setDuetData: (data) => set({ duetData: data }),
    }),
    {
      name: "duetData",
      getStorage: () => sessionStorage,
    }
  )
);
