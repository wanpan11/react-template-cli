interface CheckInfo {
  isUpdate: boolean;
  lastVer: string;
}

interface CliOutput {
  projectName: string;
  type:
    | "react-ts-vite"
    | "react-ts-webpack"
    | "🌟react-ts-rsbuild (推荐/recommend)";
  install: "Y" | "N";
}
