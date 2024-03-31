import React, { ReactNode } from "react";
import "@styles/chart/BottomSheet.scss";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundImageUrl: string; // 배경 이미지 URL을 전달받을 프롭스 추가
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  backgroundImageUrl, // 프롭스로 전달된 배경 이미지 URL 사용
  children,
}) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="bottom-sheet-all">
      <div
        className={`bottom-sheet ${isOpen ? "open" : ""}`}
        onClick={() => isOpen && onClose()}
      >
        <div
          className="bottom-sheet-content"
          onClick={handleContentClick}
          style={{
            backgroundImage: `url(${backgroundImageUrl})`, // 프롭스로 전달된 배경 이미지 URL을 사용
          }}
        >
          <div className="song-thumbnail">{children}</div>
          <div className="song-button">
            <button>솔로 모드</button>
            <button>듀엣 모드</button>
          </div>
        </div>
        {isOpen && (
          <div
            className="bottom-sheet-overlay"
            onClick={handleOverlayClick}
          ></div>
        )}
      </div>
    </div>
  );
};

export default BottomSheet;
