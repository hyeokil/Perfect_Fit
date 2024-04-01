// BottomSheet.tsx
import React, { ReactNode } from "react";
import "@styles/chart/BottomSheet.scss";
import { useSongStore } from "@/store/useSongStore";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundImageUrl: string;
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  backgroundImageUrl,
  children,
}) => {
  const selectedSong = useSongStore((state) => state.selectedSong); // Zustand 스토어를 사용하여 선택한 노래 정보 가져오기

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSoloClick = () => {
    console.log("솔로모드 누름")
    console.log(selectedSong)
  }

  const handleDuetClick = () => {
    console.log("듀엣모드 누름")
  }

  return (
    <div className="bottom-sheet-all">
      <div
        className={`bottom-sheet ${isOpen ? "open" : ""}`}
        onClick={onClose}
      >
        <div
          className="bottom-sheet-content"
          onClick={handleContentClick}
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className="song-thumbnail">{children}</div>
          <div className="song-button">
            <button onClick={handleSoloClick}>솔로 모드</button>
            <button onClick={handleDuetClick}>듀엣 모드</button>
          </div>
        </div>
        {isOpen && (
          <div className="bottom-sheet-overlay" onClick={handleOverlayClick} />
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
