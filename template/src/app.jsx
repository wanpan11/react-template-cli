import styles from "./app.less";
import img from "./assets/img/logo.jpg";

console.log(styles);

function App() {
  return (
    <div>
      <img src={img} alt="logo" className={styles.img} />
    </div>
  );
}

export default App;
