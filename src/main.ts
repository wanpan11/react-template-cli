import { program } from "commander";
import inquirer from "inquirer";
import { name, version } from "../package.json";
import { checkVersion } from "./check";
import getTemplate from "./getTemplate";
import { prompt, printUpdateMsg } from "./config";

checkVersion({ name, version })
  .then(({ isUpdate, lastVer }) => {
    if (isUpdate) return printUpdateMsg(version, lastVer);

    program.version(version, "-v, --version");
    program.description("React project template initialization tool");

    program
      .usage("<command>")
      .command("init")
      .description("create project")
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
