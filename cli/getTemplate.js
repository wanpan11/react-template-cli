/* eslint-disable no-undef */
const fs = require("fs-extra");
const path = require("path");
const ora = require("ora");
const { exec } = require("child_process");

function getTemplate({ projectName, type }) {
  const spinner = ora("模板创建中");
  spinner.color = "yellow";
  spinner.start();

  try {
    const sourceDir = path.resolve(__dirname, `../template/${type}`);
    const projectDir = path.resolve(process.cwd(), `./${projectName}`);

    fs.copy(sourceDir, projectDir, () => {
      // 修改项目名称
      const packageObj = fs.readJsonSync(`${projectDir}/package.json`);
      packageObj.name = projectName;

      // 格式化 package.json
      fs.outputFileSync(
        `${projectDir}/package.json`,
        JSON.stringify(packageObj, "", "\t")
      );

      spinner.succeed("模板创建完成");
      spinner.start("安装依赖中~~");

      exec(`cd ./${projectName} && pnpm i`, error => {
        if (!error) {
          spinner.succeed("完成啦~~");
        } else {
          // 失败
          spinner.fail("失败啦~~");
        }
      });
    });
  } catch (error) {
    spinner.stop();
    console.log(error);
  }
}

exports.getTemplate = getTemplate;
