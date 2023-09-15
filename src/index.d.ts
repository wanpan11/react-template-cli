interface CheckInfo {
  isUpdate: boolean;
  lastVer: string;
}

interface CliOutput {
  projectName: string;
  type: "react-ts-vite" | "react-ts-webpack";
  install: "Y" | "N";
}
