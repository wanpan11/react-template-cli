module.exports = {
  // 以此文件为准 不往上查找 eslint 配置文件
  root: true,
  // 环境
  env: {
    es2021: true,
    commonjs: true,
  },
  globals: {
    process: "writable",
    __dirname: "readonly",
  },
  // 继承插件特性
  extends: ["eslint:recommended"],
  // 解析选项
  parserOptions: {
    ecmaVersion: 13,
  },
  // 插件
  plugins: ["prettier"],
  // 检查规则
  rules: { "prettier/prettier": ["error", { arrowParens: "avoid" }] },
};
