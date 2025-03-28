interface CheckInfo {
  isUpdate: boolean;
  lastVer: string;
}

interface CliOutput {
  projectName: string;
  type: "react-ts-vite" | "react-ts-webpack" | "react-ts-rsbuild";
  install: "Y" | "N";
}
