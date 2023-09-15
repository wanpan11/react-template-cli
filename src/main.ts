import { program } from "commander";
import inquirer from "inquirer";
import { name, version } from "../package.json";
import { checkVersion } from "./check";
import getTemplate from "./getTemplate";
import { prompt, printUpdateMsg } from "./config";

checkVersion({ name, version })
  .then(({ isUpdate, lastVer }) => {
    if (isUpdate) {
      printUpdateMsg(version, lastVer);
      return;
    }

    program.version(version, "-v, --version");
    program.description("react 项目模板初始化工具");

    program
      .usage("<command>")
      .command("init")
      .description("创建 react 项目模板")
      .action(() => {
        inquirer.prompt(prompt).then((answers: CliOutput) => {
          getTemplate(answers);
        });
      });

    program.parse(process.argv);
  })
  .catch(e => {
    console.error(e);
  });
