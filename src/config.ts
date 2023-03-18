import path from "path";
import { fileURLToPath } from "url";
import type { Config } from "./type";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: Config = {
  tempDir: path.join(__dirname, "../temp"),
  templateDir: path.join(__dirname, "../template"),
  repoUrls: {
    "react-ts":
      "https://codeload.github.com/wanpan11/react-admin-tp/zip/refs/heads/main",
  },
  repoName: {
    "react-ts": "react-admin-tp",
  },
  tpType: ["react", "react-ts"],
};

export default config;
