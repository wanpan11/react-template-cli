const path = require("path");

module.exports = {
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
