import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "./src/entry.ts",
  output: {
    file: "./dist/cli.js",
    format: "es",
  },
  plugins: [typescript(), json()],
};
