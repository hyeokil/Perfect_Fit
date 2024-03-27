import styles from "@styles/layout/footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMicrophoneAlt,
  faBell,
  faTowerBroadcast,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: gray;
`;

const Footer = () => {
  return (
    <nav className={styles.wrapper}>
      {/* 페이지 생성 후 링크 수정하기 */}
      <div>
        <Link to="/">
          <StyledFontAwesomeIcon icon={faMusic} size="lg" />
        </Link>
        <p>노래방</p>
      </div>
      <div>
        <Link to="/">
          <StyledFontAwesomeIcon icon={faTowerBroadcast} size="lg" />
        </Link>
        <p>릴스</p>
      </div>
      <div>
        <Link to="/mainchart">
          <StyledFontAwesomeIcon icon={faMicrophoneAlt} size="lg" />
        </Link>
        <p>부르기</p>
      </div>
      <div>
        <Link to="/">
          <StyledFontAwesomeIcon icon={faBell} size="lg" />
        </Link>
        <p>알림</p>
      </div>
      <div>
        <StyledFontAwesomeIcon icon={faUser} size="lg" />
        <p>마이페이지</p>
      </div>
    </nav>
  );
};

export default Footer;
