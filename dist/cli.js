import fse from 'fs-extra';
import axios from 'axios';
import dayjs from 'dayjs';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import inquirer from 'inquirer';
import boxen from 'boxen';
import { exec } from 'child_process';
import StreamZip from 'node-stream-zip';
import ora from 'ora';

var name = "react-tp-cli";
var version = "3.0.0";

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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var config = {
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
var logFile = path.resolve(__dirname, "../versionLog.json");

function checkVersion(info) {
    return __awaiter(this, void 0, void 0, function () {
        var name, version, lastVer, _a, remoteVersion, date;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    name = info.name, version = info.version;
                    lastVer = "";
                    if (!fse.pathExistsSync(logFile)) return [3 /*break*/, 4];
                    _a = fse.readJSONSync(logFile), remoteVersion = _a.remoteVersion, date = _a.date;
                    if (!dayjs().isAfter(date)) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestRemote(name)];
                case 1:
                    lastVer = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    lastVer = remoteVersion;
                    _b.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, requestRemote(name)];
                case 5:
                    lastVer = _b.sent();
                    _b.label = 6;
                case 6:
                    if (version !== lastVer) {
                        return [2 /*return*/, { isUpdate: true, lastVer: lastVer }];
                    }
                    else {
                        return [2 /*return*/, { isUpdate: false, lastVer: lastVer }];
                    }
            }
        });
    });
}
function requestRemote(name) {
    return __awaiter(this, void 0, void 0, function () {
        var res, status, data, remoteVersion, log;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("https://registry.npmjs.org/".concat(name))];
                case 1:
                    res = _a.sent();
                    status = res.status, data = res.data;
                    if (status === 200) {
                        remoteVersion = data["dist-tags"].latest;
                        log = {
                            remoteVersion: remoteVersion,
                            date: dayjs().add(7, "day"),
                        };
                        fse.writeJsonSync(logFile, log);
                        return [2 /*return*/, remoteVersion];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    _a.sent();
                    throw new Error("requestRemote error");
                case 3: return [2 /*return*/];
            }
        });
    });
}

var tempDir = config.tempDir, templateDir = config.templateDir, repoUrls = config.repoUrls, repoName = config.repoName, tpType = config.tpType;
var spinner = ora("");
function getTemplate(_a) {
    var projectName = _a.projectName, type = _a.type;
    var runDir = path.resolve(process.cwd(), "./".concat(projectName));
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
    return __awaiter(this, void 0, void 0, function () {
        var fileName, stream, _a, status, data, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileName = "/".concat(repoName[type], ".zip");
                    stream = fse.createWriteStream(path.join(tempDir, fileName));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios.get(repoUrls[type], {
                            responseType: "stream",
                        })];
                case 2:
                    _a = _b.sent(), status = _a.status, data = _a.data;
                    if (status === 200) {
                        data.pipe(stream);
                        data.on("end", function () {
                            var zip = new StreamZip({
                                file: "".concat(tempDir + fileName),
                                storeEntries: true,
                            });
                            zip.on("ready", function () {
                                zip.extract("".concat(repoName[type], "-main"), runDir, function (extractErr) {
                                    if (extractErr) {
                                        errStop("模版解压失败 extractErr===>" + extractErr);
                                    }
                                    else {
                                        install(projectName, runDir);
                                    }
                                    zip.close();
                                });
                            });
                            zip.on("error", function (zipErr) {
                                errStop("模版解压失败 zipErr===>" + zipErr);
                            });
                        });
                    }
                    else {
                        errStop("网络异常！");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    errStop("模版下载失败 请检查网络！" + error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getReact(projectName, type, runDir) {
    try {
        fse.copy("".concat(templateDir, "/").concat(type), runDir, function () {
            install(projectName, runDir);
        });
    }
    catch (error) {
        errStop("模版生成失败！");
    }
}
function install(projectName, runDir) {
    try {
        var packageObj = fse.readJsonSync("".concat(runDir, "/package.json"));
        packageObj.name = projectName;
        // 格式化 package.json
        fse.outputFileSync("".concat(runDir, "/package.json"), JSON.stringify(packageObj, null, "  "));
        spinner.succeed("模板创建完成");
        spinner.start("安装依赖中~~");
        /* 安装依赖 */
        exec("cd ./".concat(projectName, " && pnpm i"), function (error) {
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

checkVersion({ name: name, version: version })
    .then(function (_a) {
    var isUpdate = _a.isUpdate, lastVer = _a.lastVer;
    if (isUpdate) {
        var updaterMsg = "package update from ".concat(version, " to ").concat(lastVer, "\n     \n    run 'npm i ").concat(name, " -g'");
        console.log(boxen(updaterMsg, {
            padding: 1,
            borderColor: "blue",
            borderStyle: "double",
        }));
    }
    program.version(version, "-v, --version");
    program.description("react 项目模板初始化工具");
    program
        .usage("<command>")
        .command("init")
        .usage(" ")
        .description("创建 react 项目模板")
        .action(function () {
        var prompt = [
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
        inquirer.prompt(prompt).then(function (answers) {
            getTemplate(answers);
        });
    });
    program.parse(process.argv);
})
    .catch(function (e) {
    console.error(e);
});
//# sourceMappingURL=cli.js.map
