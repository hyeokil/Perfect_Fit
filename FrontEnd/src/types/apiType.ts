export type MusicInfoType = {
  songTitle: string;
  artist: string;
  genre: string;
  songUrl: string;
  songThumbnail: string;
  songReleaseDate: string;
  songLength: string;
  myListDisplay: boolean;
  songView: number;
};

export type ReelsDataType = {
  id: number; // 릴스 아이디
  userPath: string;
  audioPath: string;
  path: string;
  time: number;
  score: number;
  memberNickname: string;
  songTitle: string;
  follow: boolean;
  memberId: number; // userId
};

export type Song = {
  songId: number;
  songTitle: string;
  artist: string;
  genre: string;
  songUrl: string;
  songThumbnail: string;
  songReleaseDate: string;
  songLength: string;
  myListDisplay: boolean;
  songPitch: number | null;
  mrPath: string | null;
  songView: number;
};

// 참가자가 없는 duet 리스트 조회
export type DuetListData = {
  id: number;
  name: string;
  userPath: string;
  audioPath: string;
  uploaderNickname: string;
  uploaderImage: string | null;
  createdAt: string;
  songId: number;
  songTitle: string;
  artistName: string;
  songThumbnail: string;
};

export type videoInfoType = {
  songId: number;
  time: number;
  userPath: string;
  audioPath: string;
};
