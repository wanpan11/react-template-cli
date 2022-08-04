import styles from "./index.module.less";
import { Link, useLocation } from "react-router-dom";

function List({ children, title }) {
  const { pathname } = useLocation();

  return (
    <div className={styles.title}>
      <h1>this List page</h1>

      <h1>{title}</h1>

      {children}

      {pathname !== "/list" ? (
        <button>
          <Link to="/list">back</Link>
        </button>
      ) : (
        <button>
          <Link to="/list/detail">detail page</Link>
        </button>
      )}
    </div>
  );
}

export default List;
