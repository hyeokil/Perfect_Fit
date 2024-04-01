import { create } from "zustand";

type SaveStoreType = {
  mode : 'single' | 'firstDuet' | 'secondDuet' |null
  isCamera: boolean;
  videoBlob: Blob | null;
  voiceBlob: Blob | null;
  musicBlob: Blob | null;
  setMode :(state :'single' | 'firstDuet' | 'secondDuet' ) => void
  setIsCamera: (state: boolean) => void;
  setVideoBlob: (blob: Blob | null) => void;
  setVoiceBlob: (blob: Blob | null) => void;
  setMusicBlob: (blob: Blob) => void;
};

const useSaveStore = create<SaveStoreType>((set) => ({
  mode : null,
  setMode : (state : 'single' | 'firstDuet' | 'secondDuet') => set({mode: state}),
  isCamera: true,
  // --------------------------------------------------------------
  videoBlob: null,
  voiceBlob: null,
  musicBlob: null,
  // --------------------------------------------------------------
  
  // --------------------------------------------------------------
  setVideoBlob: (blob: Blob | null) => set({ videoBlob: blob }),
  setVoiceBlob: (blob: Blob | null) => set({ voiceBlob: blob }),
  setMusicBlob: (blob: Blob) => set({ musicBlob: blob }),
  setIsCamera: (state: boolean) => set({ isCamera: state }),
}));

export default useSaveStore;
