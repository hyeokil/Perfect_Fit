import React, { useEffect, useState } from "react";
import "@/styles/chart/DuetChart.scss";
import { getDuetNoPartList } from "@/api/duetApi";
import { DuetListData } from "@/types/apiType";
import DuetCard from "./DuetCard";
import cardimage from "../../../public/image/chart/DuetChart.png";
import { useDuetStore } from "@/store/useSongStore";
import { useNavigate } from "react-router";
const DuetChart: React.FC = () => {
  // const [duetData, setDuetData] = useState([])
  const setDuet = useDuetStore(state => state.setDuetData )
  const navigate = useNavigate()
  useEffect(() => {
    const Data = async () => {
      try {
        const res = await getDuetNoPartList();
        console.log(res);
        // setDuetData(res.data.dataBody)
      } catch (error) {
        console.log(error);
      }
    };
    Data();
  }, []);
  const goSecondDuet = (data:DuetListData) => {
    setDuet(data)
    navigate('/secondduet')
  }
  const duetData = [
    {
      id: 5,
      name: "ttest.com",
      userPath: "wwwuser",
      audioPath: "wwwaudio",
      uploaderNickname: "테스트 2트",
      uploaderImage: null,
      createdAt: "2024-04-02T11:20:26.555396",
      songId: 5,
      songTitle: "EENIE MEENIE ",
      artistName: "청하",
      songThumbnail:
        "https://cdn.music-flo.com/image/v2/album/889/795/22/04/422795889_65ea9d7a_s.jpg?1709874557249/dims/resize/500x500/quality/90",
    },
    {
      id: 5,
      name: "ttest.com",
      userPath: "wwwuser",
      audioPath: "wwwaudio",
      uploaderNickname: "테스트 2트",
      uploaderImage: null,
      createdAt: "2024-04-02T11:20:26.555396",
      songId: 5,
      songTitle: "EENIE MEENIE ",
      artistName: "청하",
      songThumbnail:
        "https://cdn.music-flo.com/image/v2/album/889/795/22/04/422795889_65ea9d7a_s.jpg?1709874557249/dims/resize/500x500/quality/90",
    },
  ];
  return (
    <div className="duet-container">
      <div className="duet-header">
        <img src={cardimage} alt="" className="DuetChart" />
      </div>
      <div className="duet-border">
        {duetData.length === 0 ? (
          <div className="duet-content">
            <p>아직 생성된 duet 영상이 없습니다.!</p>
          </div>
        ) : (
          duetData.map((data, index) => (
            <div className="duet-content" key={index} onClick={() => goSecondDuet(data)}>
              <DuetCard duetData={data} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DuetChart;
