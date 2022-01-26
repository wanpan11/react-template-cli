/* eslint-disable no-undef */
const fs = require("fs-extra");
const path = require("path");
const ora = require("ora");

function getTemplate({ projectName }) {
  const spinner = ora("Loading unicorns");
  spinner.start();

  const sourceDir = path.resolve(process.cwd(), `./template`);
  const projectDir = path.resolve(process.cwd(), `./${projectName}`);

  // 复制模板
  fs.copy(sourceDir, projectDir, () => {
    spinner.stop();
    // 修改项目名称
    const packageObj = fs.readJsonSync(`${projectDir}/package.json`);
    packageObj.name = projectName;
    fs.outputFileSync(
      `${projectDir}/package.json`,
      JSON.stringify(packageObj, "", "\t")
    );
    console.log("模板创建完成");
  });
}

exports.getTemplate = getTemplate;
