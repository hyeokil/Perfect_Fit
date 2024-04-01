export function getHalfTime(timeString: string): string {
  const [minutes, seconds] = timeString.split(':').map(Number);

  // 전체 시간을 초 단위로 변환
  const totalSeconds = minutes * 60 + seconds;

  // 절반 시간 계산
  const halfTimeInSeconds = Math.floor(totalSeconds / 2);

  // 절반 시간을 분과 초로 변환
  const halfMinutes = Math.floor(halfTimeInSeconds / 60);
  const halfSeconds = halfTimeInSeconds % 60;

  // 결과를 문자열 형식으로 반환 ('분:초')
  return `${halfMinutes}:${halfSeconds.toString().padStart(2, '0')}`;
}

// 예시 사용
// const songLength = "3:49";
// const halfSongLength = getHalfTime(songLength);
// console.log(halfSongLength); // 출력: 1:54
