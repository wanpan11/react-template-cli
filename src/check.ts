import fse from "fs-extra";
import axios from "axios";
import dayjs from "dayjs";
import { logFile } from "./config";

async function checkVersion(info: { name: string; version: string }) {
  const { name, version } = info;

  let lastVer = "";
  if (fse.pathExistsSync(logFile)) {
    const { remoteVersion, date } = fse.readJSONSync(logFile);

    if (dayjs().isAfter(date)) {
      lastVer = await requestRemote(name);
    } else {
      lastVer = remoteVersion;
    }
  } else {
    lastVer = await requestRemote(name);
  }

  if (version !== lastVer) {
    return { isUpdate: true, lastVer };
  } else {
    return { isUpdate: false, lastVer };
  }
}

async function requestRemote(name: string) {
  try {
    const res = await axios.get(`https://registry.npmjs.org/${name}`);

    const { status, data } = res;

    if (status === 200) {
      const remoteVersion = data["dist-tags"].latest;
      const log = {
        remoteVersion: remoteVersion,
        date: dayjs().add(7, "day"),
      };
      fse.writeJsonSync(logFile, log);
      return remoteVersion;
    }
  } catch (error) {
    throw new Error("requestRemote error");
  }
}

export { checkVersion };
