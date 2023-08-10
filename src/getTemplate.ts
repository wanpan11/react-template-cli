import path from "path";
import fse from "fs-extra";
import { exec } from "child_process";
import StreamZip from "node-stream-zip";
import ora from "ora";
import axios from "axios";
import downloadConf, { repo } from "./config";

const { tempDir } = downloadConf;
const spinner = ora("");

function getTemplate({ projectName, type }: CliInput) {
  const runDir = path.resolve(process.cwd(), `./${projectName}`);
  spinner.start();
  spinner.color = "yellow";
  spinner.text = "模版下载中~~";

  if (!fse.existsSync(tempDir)) {
    fse.mkdirSync(tempDir);
  }

  getReactTs(projectName, type, runDir);
}

async function getReactTs(projectName: string, type: string, runDir: string) {
  const fileName = `${Date.now()}.zip`;
  const zipPath = path.resolve(tempDir, "./" + fileName);
  const stream = fse.createWriteStream(zipPath);

  try {
    const { status, data } = await axios.get(repo[type].url, {
      responseType: "stream",
    });
    spinner.succeed("模板下载成功");
    spinner.start("模板解压中~~");

    if (status === 200) {
      data.pipe(stream);
      data.on("end", () => {
        const zip = new StreamZip({
          file: zipPath,
          storeEntries: true,
        });

        zip.on("ready", () => {
          zip.extract(repo[type].dirName, runDir, extractErr => {
            if (extractErr) {
              errStop("模版解压失败 ===>" + extractErr);
            } else {
              install(projectName, runDir);
            }
            zip.close();
          });
        });

        zip.on("error", zipErr => {
          errStop("模版下载失败 ===>" + zipErr);
        });
      });
    } else {
      errStop("网络异常！");
    }
  } catch (error) {
    errStop("模版下载失败 请检查网络！" + error);
  }
}

function install(projectName: string, runDir: string) {
  try {
    const packageObj = fse.readJsonSync(`${runDir}/package.json`);
    packageObj.name = projectName;

    // 格式化 package.json
    fse.outputFileSync(
      `${runDir}/package.json`,
      JSON.stringify(packageObj, null, "  ")
    );
    spinner.succeed("模板创建完成");
    spinner.start("安装依赖中~~");

    // 检查 pnpm
    exec("pnpm -v", checkErr => {
      if (!checkErr) {
        /* 安装依赖 */
        exec(`cd ./${projectName} && pnpm i`, installErr => {
          if (!installErr) {
            spinner.succeed("依赖下载完成啦~~");
          } else {
            spinner.fail("依赖下载异常~~" + installErr);
          }
        });
      } else {
        spinner.succeed("pnpm 不存在请手动安装依赖");
      }
    });
  } catch (error) {
    errStop(error as string);
  }
}

function errStop(msg: string) {
  spinner.fail(msg);
  spinner.stop();
}

export default getTemplate;
