import create from "zustand";

interface Song {
  songId: string;
  songTitle: string;
  artist: string;
  songThumbnail: string;
  myListDisplay: boolean;
  song_thumbnail: string;
  song_title: string;
  artist_name: string;
}

interface SongStore {
  selectedSong: Song | null;
  setSelectedSong: (song: Song | null) => void;
}

export const useSongStore = create<SongStore>((set) => ({
  selectedSong: null,
  setSelectedSong: (song) => set({ selectedSong: song }),
}));
