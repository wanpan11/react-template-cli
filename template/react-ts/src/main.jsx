import React, { StrictMode } from "react";
import { render } from "react-dom";
import "./assets/css/_init.less";
import App from "./router";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
