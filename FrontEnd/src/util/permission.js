// MediaDevices.getUserMedia()

export const micPermission = await navigator.permissions.query({name:'microphone'})
if (micPermission.state !== 'granted') {
  window.alert('바보')
}


import React, { useEffect } from 'react';

const Record = () => {
  useEffect(() => {
    navigator.mediaDevices
    .getUserMedia({ audio : true, video : true})
    .then((stream) => {
      console.log(stream)

    })
    .catch((err) => {
      window.alert("카메라 접근이 거절되었습니다. 설정에서 승인가능합니다.")
    })
  }, [])
  return (
    <div>
      <h1>ㅎㅇㅎㅇ</h1>
    </div>
  );
};

export default Record;