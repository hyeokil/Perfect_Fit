import styles from "@styles/layout/header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft, faSearch, faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

/**
 * 헤더 사용법
 * 사용하고자 하는 페이지에 불러오기
 * title, state, page => prop으로 내려주기
 */

type HeaderProps = {
  // 타이틀
  title: string;
  // 뒤로가기=back or 닫기 = close
  state: ("back" | "search" | "setting" | "close")[];
  // 닫기 버튼 클릭 시 이동 할 페이지 주소
  page?: string;
};

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className={styles.wrapper}>
      <div>
        {props.state.includes("back") && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.back}
            onClick={() => navigate(-1)}
          />
        )}
        {props.state.includes("search") && (
          <FontAwesomeIcon 
            icon={faSearch}
            className={styles.search}
            onClick={() => navigate(`/search`)}
          />
        )}
        {props.state.includes("setting") && (
          <FontAwesomeIcon 
            icon={faCog}
            className={styles.setting}
            onClick={() => navigate(`/setting`)}
          />
        )}
        <p className={styles.title}>{props.title}</p>
        {props.state.includes("close") && (
          <div className={styles.close}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                navigate(`/${props.page}`);
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
