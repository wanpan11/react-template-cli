var fs = require("fs-extra");
const path = require("path");

function getTemplate({ projectName }) {
  const sourceDir = path.resolve(process.cwd(), `./template`);
  const projectDir = path.resolve(process.cwd(), `./${projectName}`);
  fs.copySync(sourceDir, projectDir);
}

exports.getTemplate = getTemplate;
