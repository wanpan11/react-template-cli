const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const config = require("./config")[isDev ? "dev" : "build"];

module.exports = {
	// 运行模式
	mode: isDev ? "development" : "production",
	// loader 规则
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ["babel-loader"],
				exclude: /node_modules/, //排除 node_modules 目录
			},
		],
	},
	// 插件配置
	plugins: [
		//数组 放着所有的webpack插件
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "index.html", //打包后的文件名
			config: config.template,
		}),
	],
	// webpack server
	devServer: {
		port: "4400", //默认是8080
		quiet: false, //默认不启用
		inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
		stats: "errors-only", //终端仅打印 error
		overlay: false, //默认不启用
		clientLogLevel: "silent", //日志等级
		compress: true, //是否启用 gzip 压缩
	},
	devtool: "cheap-module-eval-source-map", //开发环境下使用
};
