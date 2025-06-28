import path from "path";
import fse from "fs-extra";
import { execSync } from "child_process";
import StreamZip from "node-stream-zip";
import ora from "ora";
import axios from "axios";
import { repo, downloadConf } from "./config";

const { tempDir } = downloadConf;
const spinner = ora("");

let projectNameGlobal = "";
let selectTypeGlobal: CliOutput["type"] = "🌟react-ts-rsbuild (推荐/recommend)";
let userDirGlobal = "";
let needInstall: CliOutput["install"] = "N";

function getTemplate({ projectName, type, install }: CliOutput) {
  projectNameGlobal = projectName;
  selectTypeGlobal = type;
  userDirGlobal = path.resolve(process.cwd(), `./${projectName}`);
  needInstall = install;

  spinner.start();
  spinner.color = "yellow";
  spinner.text = "template downloading ~~";

  if (!fse.existsSync(tempDir)) fse.mkdirSync(tempDir);

  download();
}

async function download() {
  const fileName = `${Date.now()}.zip`;
  const zipPath = path.resolve(tempDir, "./" + fileName);
  const stream = fse.createWriteStream(zipPath);

  try {
    const { status, data } = await axios.get(repo[selectTypeGlobal].url, {
      responseType: "stream",
    });

    if (status === 200) {
      // spinner.succeed("模板下载成功");

      data.pipe(stream);
      data.on("end", () => {
        // spinner.start("模板解压中~~");

        const zip = new StreamZip({
          file: zipPath,
          storeEntries: true,
        });

        zip.on("ready", () => {
          zip.extract(
            repo[selectTypeGlobal].dirName,
            userDirGlobal,
            extractErr => {
              if (extractErr) {
                errStop("decompression failed ===>" + extractErr);
              } else {
                install();
              }
              zip.close();
            }
          );
        });

        zip.on("error", zipErr => {
          errStop("decompression failed ===>" + zipErr);
        });
      });
    } else {
      errStop("network error!");
    }
  } catch (error) {
    errStop("download error!" + error);
  }
}

function install() {
  try {
    const packageObj = fse.readJsonSync(`${userDirGlobal}/package.json`);
    packageObj.name = projectNameGlobal;

    // 格式化 package.json
    fse.outputFileSync(
      `${userDirGlobal}/package.json`,
      JSON.stringify(packageObj, null, "  ")
    );
    spinner.succeed("template create success!");
    clearTemp();

    try {
      // 切换到项目目录
      process.chdir(userDirGlobal);

      // git
      const git = execSync("git init", { encoding: "utf8" });
      spinner.info(`git init: ${git.trim()}`);

      // 检查是否需要安装依赖
      if (needInstall === "N") return;

      // 检查pnpm版本
      const version = execSync("pnpm -v", { encoding: "utf8" });
      spinner.info(`pnpm version: ${version.trim()}`);

      // 安装依赖
      spinner.start("installing dependencies ~~");
      execSync("pnpm i", { stdio: "inherit" });
      spinner.succeed("react template created. ~~");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error?.message || error);
      spinner.fail("dependency installation failed.");
      return;
    }
  } catch (error) {
    errStop(error as string);
  }
}

function errStop(msg: string) {
  spinner.fail(msg);
  spinner.stop();
}

function clearTemp() {
  if (fse.existsSync(tempDir)) {
    fse.removeSync(tempDir);
  }
}

export default getTemplate;
