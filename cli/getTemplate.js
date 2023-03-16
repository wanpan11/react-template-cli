const fsExtra = require("fs-extra");
const path = require("path");
const ora = require("ora");
const request = require("request");
const StreamZip = require("node-stream-zip");
const { exec } = require("child_process");
const {
  tempDir,
  templateDir,
  repoUrls,
  repoName,
  tpType,
} = require("./config");

const spinner = ora("模板创建中");
spinner.color = "yellow";

function getTemplate({ projectName, type }) {
  const runDir = path.resolve(process.cwd(), `./${projectName}`);
  spinner.start();

  /* 压缩包目录 */
  if (!fsExtra.existsSync(tempDir)) {
    fsExtra.mkdirSync(tempDir);
  }

  if (type === tpType[0]) {
    getReact(projectName, type, runDir);
  } else {
    getReactTs(projectName, type, runDir);
  }
}

function getReactTs(projectName, type, runDir) {
  const fileName = `/${repoName[type]}.zip`;
  const stream = fsExtra.createWriteStream(path.join(tempDir, fileName));

  try {
    request(repoUrls[type])
      .on("error", function (requestErr) {
        errStop("模版下载失败 请检查网络！" + requestErr);
      })
      .pipe(stream)
      .on("close", function () {
        const zip = new StreamZip({
          file: `${tempDir + fileName}`,
          storeEntries: true,
        });

        zip.on("error", zipErr => {
          errStop("模版解压失败 zipErr===>" + zipErr);
        });

        zip.on("ready", () => {
          zip.extract(`${repoName[type]}-main`, runDir, extractErr => {
            if (extractErr) {
              errStop("模版解压失败 extractErr===>" + extractErr);
            } else {
              install(projectName, runDir);
            }
            zip.close();
          });
        });
      });
  } catch (error) {
    errStop("模版下载失败 请检查网络！" + error);
  }
}

function getReact(projectName, type, runDir) {
  try {
    fsExtra.copy(`${templateDir}/${type}`, runDir, () => {
      install(projectName, runDir);
    });
  } catch (error) {
    errStop("模版生成失败！");
  }
}

function install(projectName, runDir) {
  try {
    const packageObj = fsExtra.readJsonSync(`${runDir}/package.json`);
    packageObj.name = projectName;
    // 格式化 package.json
    fsExtra.outputFileSync(
      `${runDir}/package.json`,
      JSON.stringify(packageObj, "", "\t")
    );
    spinner.succeed("模板创建完成");
    spinner.start("安装依赖中~~");

    /* 安装依赖 */
    exec(`cd ./${projectName} && pnpm i`, error => {
      if (!error) {
        spinner.succeed("完成啦~~");
      } else {
        spinner.fail("失败啦~~");
      }
    });
  } catch (error) {
    errStop("install error===> ", error);
  }
}

function errStop(msg) {
  spinner.fail(msg);
  spinner.stop();
}

exports.getTemplate = getTemplate;
