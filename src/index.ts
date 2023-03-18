import pkg from "../package.json";
import { checkVersion } from "./check";
import { program } from "commander";
import inquirer from "inquirer";
import boxen from "boxen";
import getTemplate from "./getTemplate";

checkVersion(pkg)
  .then(({ isUpdate, lastVer }) => {
    if (isUpdate) {
      const updaterMsg = `package update from ${pkg.version} to ${lastVer}
     
    run 'npm i ${pkg.name} -g'`;

      console.log(
        boxen(updaterMsg, {
          padding: 1,
          borderColor: "blue",
          borderStyle: "double",
        })
      );
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
