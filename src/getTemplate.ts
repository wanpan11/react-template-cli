import path from "path";
import fse from "fs-extra";
import { exec } from "child_process";
import StreamZip from "node-stream-zip";
import ora from "ora";
import axios from "axios";
import { repo, downloadConf } from "./config";

const { tempDir } = downloadConf;
const spinner = ora("");

let projectNameGlobal = "";
let typeGlobal: CliOutput["type"] = "react-ts-rsbuild";
let runDirGlobal = "";
let needInstall: CliOutput["install"] = "N";

function getTemplate({ projectName, type, install }: CliOutput) {
  projectNameGlobal = projectName;
  typeGlobal = type;
  runDirGlobal = path.resolve(process.cwd(), `./${projectName}`);
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
    const { status, data } = await axios.get(repo[typeGlobal].url, {
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
          zip.extract(repo[typeGlobal].dirName, runDirGlobal, extractErr => {
            if (extractErr) {
              errStop("decompression failed ===>" + extractErr);
            } else {
              install();
            }
            zip.close();
          });
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
    const packageObj = fse.readJsonSync(`${runDirGlobal}/package.json`);
    packageObj.name = projectNameGlobal;

    // 格式化 package.json
    fse.outputFileSync(
      `${runDirGlobal}/package.json`,
      JSON.stringify(packageObj, null, "  ")
    );
    spinner.succeed("template create success!");

    if (needInstall === "N") return;
    spinner.start("installing dependencies ~~");
    // 检查 pnpm
    exec("pnpm -v", checkErr => {
      if (!checkErr) {
        /* 安装依赖 */
        exec(`cd ./${projectNameGlobal} && pnpm i`, installErr => {
          if (!installErr) {
            spinner.succeed("success ~~");
          } else {
            spinner.fail("installing dependencies error ~~" + installErr);
          }
        });
      } else {
        spinner.succeed("pnpm does not exist!");
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
