/* eslint-disable no-undef */
const fs = require("fs-extra");
const path = require("path");
const ora = require("ora");

function getTemplate({ projectName }) {
  const spinner = ora("模板创建中");
  spinner.color = "yellow";
  spinner.start();

  try {
    const sourceDir = path.resolve(__dirname, `../template`);
    const projectDir = path.resolve(process.cwd(), `./${projectName}`);

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
  } catch (error) {
    spinner.stop();
    console.log(error);
  }
}

exports.getTemplate = getTemplate;
