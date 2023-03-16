const program = require("commander");
const inquirer = require("inquirer");
const updater = require("pkg-updater");
const info = require("../package.json");
const { getTemplate } = require("./getTemplate");

const updaterMsg = `package update from <%=current%> to <%=latest%>.
run 'npm i ${info.name} -g'
`;

updater({
  pkg: info,
  registry: `https://registry.npmjs.org/${info.name}`, // custom registry
  tag: "next", // custom the check tag(default is latest)
  checkInterval: 24 * 60 * 60 * 1000, // custom the check interval(ms)
  updateMessage: updaterMsg, // custom notify message
}).then(() => {
  /* start cli here */
  program.version(info.version, "-v, --version");
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
});
