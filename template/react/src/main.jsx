import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./assets/css/_init.less";
import App from "./router";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

console.log("process.env.APP_NAME ===> ", process.env.APP_NAME);
