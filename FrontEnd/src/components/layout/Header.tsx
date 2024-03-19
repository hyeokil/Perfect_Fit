import styles from "@styles/layout/header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

// title, 뒤로가기 true, x 버튼 false 눌렀을때 event
type ChildProps = {
  title: string;
  state: string;
  page: string;
  // event: () => void;
};

const Header = (props: ChildProps) => {
  const navigate = useNavigate();
  const state = "back";
  const page = "access";
  return (
    <header className={styles.wrapper}>
      <div>
        {state === "back" && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.back}
            onClick={() => navigate(-1)}
          />
        )}
        <p className={styles.title}>{props.title}</p>
        {state !== "back" && (
          <div className={styles.close}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => {
                navigate(`/${page}`);
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
