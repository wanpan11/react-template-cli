import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "./src/main.ts",
  output: {
    file: "./dist/cli.js",
    format: "es",
  },
  plugins: [typescript(), json()],
};
