import path from 'path';
import fse from 'fs-extra';
import axios from 'axios';
import dayjs from 'dayjs';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import inquirer from 'inquirer';
import boxen from 'boxen';
import { exec } from 'child_process';
import StreamZip from 'node-stream-zip';
import ora from 'ora';

var name = "react-tp-cli";
var version = "3.0.0";
var description = "react项目模板";
var keywords = [
	"react",
	"react-template",
	"react-admin",
	"template",
	"admin"
];
var author = "wanp11";
var license = "ISC";
var main = "index.js";
var type = "module";
var bin = {
	rt: "./index.js"
};
var repository = {
	type: "git",
	url: "https://github.com/wanpan11/react-template-cli.git"
};
var scripts = {
	lint: "eslint --ext .js,.jsx,ts,tsx ./",
	build: "rollup --config ./rollup.config.js --watch",
	prepare: "husky install"
};
var devDependencies = {
	"@rollup/plugin-json": "^6.0.0",
	"@rollup/plugin-typescript": "^11.0.0",
	"@types/fs-extra": "^11.0.1",
	"@types/inquirer": "^9.0.3",
	"@types/node": "^18.15.3",
	"@typescript-eslint/eslint-plugin": "^5.55.0",
	"@typescript-eslint/parser": "^5.55.0",
	eslint: "^8.21.0",
	"eslint-config-prettier": "^8.5.0",
	"eslint-plugin-prettier": "^4.2.1",
	husky: "^8.0.3",
	"lint-staged": "^13.1.2",
	prettier: "2.7.1",
	rollup: "^3.19.1",
	tslib: "^2.5.0"
};
var dependencies = {
	axios: "^1.3.4",
	boxen: "^7.0.2",
	commander: "^8.3.0",
	dayjs: "^1.11.7",
	"fs-extra": "^10.0.0",
	inquirer: "^8.2.0",
	"node-stream-zip": "^1.15.0",
	ora: "^6.1.2",
	typescript: "^5.0.2"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	keywords: keywords,
	author: author,
	license: license,
	main: main,
	type: type,
	bin: bin,
	repository: repository,
	scripts: scripts,
	devDependencies: devDependencies,
	dependencies: dependencies,
	"lint-staged": {
	"*.{js,jsx,ts,tsx}": [
		"eslint  --fix"
	],
	"*.md": [
		"prettier --write"
	]
}
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
const logFile = path.resolve(__dirname$1, "../versionLog.json");
function checkVersion(info) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, version } = info;
        let lastVer = "";
        if (fse.pathExistsSync(logFile)) {
            const { remoteVersion, date } = fse.readJSONSync(logFile);
            if (dayjs().isAfter(date)) {
                lastVer = yield requestRemote(name);
            }
            else {
                lastVer = remoteVersion;
            }
        }
        else {
            lastVer = yield requestRemote(name);
        }
        if (version !== lastVer) {
            return { isUpdate: true, lastVer };
        }
        else {
            return { isUpdate: false, lastVer };
        }
    });
}
function requestRemote(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios.get(`https://registry.npmjs.org/${name}`);
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
        }
        catch (error) {
            throw new Error("requestRemote error");
        }
    });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const config = {
    tempDir: path.join(__dirname, "../temp"),
    templateDir: path.join(__dirname, "../template"),
    repoUrls: {
        "react-ts": "https://codeload.github.com/wanpan11/react-admin-tp/zip/refs/heads/main",
    },
    repoName: {
        "react-ts": "react-admin-tp",
    },
    tpType: ["react", "react-ts"],
};

const { tempDir, templateDir, repoUrls, repoName, tpType } = config;
const spinner = ora("");
function getTemplate({ projectName, type, }) {
    const runDir = path.resolve(process.cwd(), `./${projectName}`);
    spinner.start();
    spinner.color = "yellow";
    spinner.text = "模版下载中~~";
    /* 压缩包目录 */
    if (!fse.existsSync(tempDir)) {
        fse.mkdirSync(tempDir);
    }
    if (type === tpType[0]) {
        getReact(projectName, type, runDir);
    }
    else {
        getReactTs(projectName, type, runDir);
    }
}
function getReactTs(projectName, type, runDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = `/${repoName[type]}.zip`;
        const stream = fse.createWriteStream(path.join(tempDir, fileName));
        try {
            const response = yield axios.get(repoUrls[type], {
                responseType: "stream",
            });
            response.data.pipe(stream);
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
                    }
                    else {
                        install(projectName, runDir);
                    }
                    zip.close();
                });
            });
        }
        catch (error) {
            errStop("模版下载失败 请检查网络！" + error);
        }
    });
}
function getReact(projectName, type, runDir) {
    try {
        fse.copy(`${templateDir}/${type}`, runDir, () => {
            install(projectName, runDir);
        });
    }
    catch (error) {
        errStop("模版生成失败！");
    }
}
function install(projectName, runDir) {
    try {
        const packageObj = fse.readJsonSync(`${runDir}/package.json`);
        packageObj.name = projectName;
        // 格式化 package.json
        fse.outputFileSync(`${runDir}/package.json`, JSON.stringify(packageObj, [""], "\t"));
        spinner.succeed("模板创建完成");
        spinner.start("安装依赖中~~");
        /* 安装依赖 */
        exec(`cd ./${projectName} && pnpm i`, error => {
            if (!error) {
                spinner.succeed("完成啦~~");
            }
            else {
                spinner.fail("失败啦~~");
            }
        });
    }
    catch (error) {
        errStop(error);
    }
}
function errStop(msg) {
    spinner.fail(msg);
    spinner.stop();
}

checkVersion(pkg)
    .then(({ isUpdate, lastVer }) => {
    if (isUpdate) {
        const updaterMsg = `package update from ${pkg.version} to ${lastVer}
     
    run 'npm i ${pkg.name} -g'`;
        console.log(boxen(updaterMsg, {
            padding: 1,
            borderColor: "blue",
            borderStyle: "double",
        }));
    }
    program.version(pkg.version, "-v, --version");
    program.description("react 项目模板初始化工具");
    program
        .usage("<command>")
        .command("init")
        .usage(" ")
        .description("创建 react 项目模板")
        .action(() => {
        const prompt = [
            {
                type: "input",
                message: "请输入项目名称",
                name: "projectName",
                default: "react-app",
            },
            {
                type: "list",
                message: "请选择模板类型：",
                name: "type",
                default: "react",
                choices: ["react", "react-ts"],
            },
        ];
        inquirer.prompt(prompt).then(answers => {
            getTemplate(answers);
        });
    });
    program.parse(process.argv);
})
    .catch(e => {
    console.log("error ===> ", e);
});
