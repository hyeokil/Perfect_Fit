import { createMicrophoneVolumeMonitor } from "@/util/record";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type StatusType = {
  media: MediaStream;
};
const Box = styled.div`
display: flex;
align-items: end;
justify-content: space-between;
width: 90px;
height: 30px;
`
const Stick = styled.div.attrs<StickType>((props) => ({
  style: {
    backgroundColor: props.color,
    height: `${props.height}%`,
  },
}))`
  width: 4px;
  transition: 
    height 0.3s ease,
    background-color 0.3s ease;
`;
type StickType = {
  color : string;
  height : number
}

const VolumeStatus = (props: StatusType) => {
  const media = props.media;
  const [audioVolume, setAudioVolume] = useState<number>(0);
  // console.log(media);
  
  useEffect(() => {
    if (!media) {
      return;
    }

    const { startMonitoring, stopMonitoring } = createMicrophoneVolumeMonitor(
      media,
      setAudioVolume
    );

    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, [media]);

  // audio 크기
  const getRandomHeight = () => {
    return Math.max(10, audioVolume * (0.5 + Math.random() / 2));
  };


  // 랜덤 color
  // const getVolumeDivColor = () => {
  //   const blue = Math.floor(Math.random() * 256)
  //   .toString(16)
  //   .padStart(2, '0')

  //   return `#00${blue}FF`
  // }
  // const colors = Array.from({ length: 6 }, getVolumeDivColor);

  const selected : string[] = ['#3DB9FF','#46B8E0','#3DB9FF','#83E4F1','#3DB9FF','#3DB9FF','#3DB9FF','#46B8E0','#83E4F1','#3DB9FF','#3DB9FF','#46B8E0','#83E4F1']







  return (
    <div>
      <Box>
        {selected.map((color:string, index:number) => {
          return <Stick key={index} color={color} height = {getRandomHeight()}/>
        })}
      </Box>
    </div>
  );
};

export default VolumeStatus;
