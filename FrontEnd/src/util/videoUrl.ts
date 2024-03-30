export const VideoId = (url:string) => {
  const regex = /[?&]v=([^&#]*)/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}