import { program } from "commander";
import inquirer from "inquirer";
import boxen from "boxen";
import { name, version } from "../package.json";
import { checkVersion } from "./check";
import getTemplate from "./getTemplate";
import { tpList } from "./config";

checkVersion({ name, version })
  .then(({ isUpdate, lastVer }) => {
    if (isUpdate) {
      const updaterMsg = `package update from ${version} to ${lastVer}
     
    run 'npm i ${name} -g'`;

      console.log(
        boxen(updaterMsg, {
          padding: 1,
          borderColor: "blue",
          borderStyle: "double",
        })
      );
    }

    program.version(version, "-v, --version");
    program.description("react 项目模板初始化工具");

    program
      .usage("<command>")
      .command("init")
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
            message: "请选择模板：",
            name: "type",
            default: tpList[0],
            choices: tpList,
          },
        ];

        inquirer.prompt(prompt).then((answers: CliInput) => {
          getTemplate(answers);
        });
      });

    program.parse(process.argv);
  })
  .catch(e => {
    console.error(e);
  });
