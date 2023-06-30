import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadConf = {
  tempDir: path.resolve(__dirname, "../temp"),
  templateDir: path.join(__dirname, "../template"),
};

const logFile = path.resolve(__dirname, "../versionLog.json");
const tpList = ["react-ts-webpack(推荐)", "react"];
const repo = {
  [tpList[0]]: {
    url: "https://codeload.github.com/wanpan11/react-admin-tp/zip/refs/heads/main",
    dirName: "react-admin-tp-main",
  },
};
export { logFile, tpList, repo };
export default downloadConf;
