import styles from "./app.module.less";
import img from "../assets/img/logo.jpg";

console.log(styles);

function App() {
  return (
    <div className={styles.content_box}>
      <h1>start you react app</h1>
      <img src={img} alt="logo" className={styles.img} />
    </div>
  );
}

export default App;
