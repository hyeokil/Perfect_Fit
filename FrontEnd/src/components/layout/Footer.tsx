// footer.tsx

import styles from "@styles/layout/footer.module.scss";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMicrophoneAlt,
  faBell,
  faTowerBroadcast,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useState } from "react";

interface StyledIconProps extends FontAwesomeIconProps {
  selected: boolean;
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)<StyledIconProps>`
  color: gray;

  ${(props) =>
    props.selected &&
    css`
      color: rgb(125, 174, 400);
    `}
`;

const Footer: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <nav className={styles.wrapper}>
      {/* 페이지 생성 후 링크 수정하기 */}
      <div onClick={() => setSelectedIcon("reels")} className={selectedIcon === "reels" ? styles.selected : ""}>
        <Link to="/reels">
          <StyledFontAwesomeIcon icon={faTowerBroadcast} size="lg" selected={selectedIcon === "reels"} />
        </Link>
        <p>릴스</p>
      </div>
      <div onClick={() => setSelectedIcon("bell")} className={selectedIcon === "bell" ? styles.selected : ""}>
        <Link to="/">
          <StyledFontAwesomeIcon icon={faBell} size="lg" selected={selectedIcon === "bell"} />
        </Link>
        <p>알림</p>
      </div>
      <div onClick={() => setSelectedIcon("mainchart")} className={selectedIcon === "mainchart" ? styles.selected : ""}>
        <Link to="/mainchart">
          <StyledFontAwesomeIcon icon={faMicrophoneAlt} size="lg" selected={selectedIcon === "mainchart"} />
        </Link>
        <p>부르기</p>
      </div>
      <div onClick={() => setSelectedIcon("search")} className={selectedIcon === "search" ? styles.selected : ""}>
        <Link to="/search">
          <StyledFontAwesomeIcon icon={faSearch} size="lg" selected={selectedIcon === "search"} />
        </Link>
        <p>검색</p>
      </div>
      <div onClick={() => setSelectedIcon("mainmypage")} className={selectedIcon === "mainmypage" ? styles.selected : ""}>
        <Link to="mainmypage">
          <StyledFontAwesomeIcon icon={faUser} size="lg" selected={selectedIcon === "mainmypage"} />
        </Link>
        <p>마이페이지</p>
      </div>
    </nav>
  );
};

export default Footer;
