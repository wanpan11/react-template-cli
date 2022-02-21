import { Link } from "react-router-dom";
import styles from "./index.module.less";
import img from "../../assets/img/logo.jpg";

const Welcome = () => {
  return (
    <div className={styles.content_box}>
      <h1>start you react app</h1>

      <div className={styles.img_box}>
        <img src={img} alt="logo" className={styles.img} />
      </div>

      <button>
        <Link to="/list">list page</Link>
      </button>
    </div>
  );
};

export default Welcome;
