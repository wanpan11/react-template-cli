import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/cli.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [typescript(), json()],
};
