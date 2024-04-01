import create from "zustand";

interface Song {
  songId: string;
  songTitle: string;
  artist: string;
  songThumbnail: string;
  myListDisplay: boolean;
}

interface SongStore {
  selectedSong: Song | null;
  setSelectedSong: (song: Song | null) => void;
}

export const useSongStore = create<SongStore>((set) => ({
  selectedSong: null,
  setSelectedSong: (song) => set({ selectedSong: song }),
}));
