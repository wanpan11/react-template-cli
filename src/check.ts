import fse from "fs-extra";
import dayjs from "dayjs";
import { logFile } from "./config";
import { exec } from "child_process";

async function checkVersion(info: {
  name: string;
  version: string;
}): Promise<CheckInfo> {
  const { name, version } = info;
  let lastVer = "";

  try {
    if (fse.pathExistsSync(logFile)) {
      const { remoteVersion, date } = fse.readJSONSync(logFile);
      lastVer = remoteVersion;

      if (dayjs().isAfter(date)) {
        lastVer = await requestRemote(name);
      }
    } else {
      lastVer = await requestRemote(name);
    }

    return { isUpdate: !!lastVer && version !== lastVer, lastVer };
  } catch (error) {
    return { isUpdate: false, lastVer };
  }
}

function requestRemote(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`npm view ${name} version`, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        const remoteVersion = stdout.trim();
        fse.writeJsonSync(logFile, {
          remoteVersion,
          date: dayjs().add(3, "day"),
        });
        resolve(remoteVersion);
      }
    });
  });
}

export { checkVersion };
