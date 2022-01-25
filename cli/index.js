const program = require("commander");
const inquirer = require("inquirer");
const { getTemplate } = require("./getTemplate");

program.version("1.0.0", "-v, --version");
program.description("react 项目初始化工具");

program
  .command("init [project-name]")
  .description("创建 react 项目模板")
  .action(() => {
    const prompt = {
      type: "input",
      message: "请输入项目名称",
      name: "projectName",
      default: "react-app",
    };

    inquirer.prompt(prompt).then(answers => {
      getTemplate(answers);
    });
  });

program.parse(process.argv);
