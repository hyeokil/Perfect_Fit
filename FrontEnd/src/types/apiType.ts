export type MusicInfoType = {
  songTitle: string,
  artist: string,
  genre: string,
  songUrl: string ,
  songThumbnail: string,
  songReleaseDate: string,
  songLength: string ,
  myListDisplay: boolean,
  songView: number
}

export type ReelsDataType = {
  id: number; // 릴스 아이디
  userPath: string;
  audioPath: string;
  path: string;
  time: number;
  score: number;
  memberNickname: string;
  songTitle: string;
  follow : boolean
  memberId : number // userId
};