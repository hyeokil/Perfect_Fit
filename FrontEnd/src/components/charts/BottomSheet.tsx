import React, { ReactNode } from "react";
import "@styles/chart/BottomSheet.scss";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 바텀 시트 내부를 클릭하면 바텀 시트가 닫히지 않도록 이벤트 전파 방지
  };

  return (
    <div className={`bottom-sheet ${isOpen ? "open" : ""}`} onClick={() => isOpen && onClose()}>
      <div className="bottom-sheet-content" onClick={handleContentClick}>
        {children}
      </div>
      {isOpen && <div className="bottom-sheet-overlay" onClick={handleOverlayClick}></div>}
    </div>
  );
};

export default BottomSheet;
