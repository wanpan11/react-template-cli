import { StrictMode } from "react";
import { render } from "react-dom";
import "./assets/_global.less";
import Index from "./pages/index";

render(
  <StrictMode>
    <Index compiler="TypeScript" framework="React" />
  </StrictMode>,
  document.getElementById("root")
);
