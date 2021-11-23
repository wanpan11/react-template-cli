const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"), //必须是绝对路径
		filename: "bundle.js",
		publicPath: "/", //通常是CDN地址
	},
	// 运行模式
	mode: isDev ? "development" : "production",
	devtool: false,
	// loader 规则
	module: {
		rules: [
			{
				test: /\.(c|le)ss$/, // 过滤样式文件
				use: ["style-loader", "css-loader", "less-loader"],
			},
			{
				test: /\.jsx?$/, // 配置js和jsx的loader
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: {
					presets: [
						// presets是babel插件的集合
						"@babel/preset-env",
						"@babel/preset-react",
					],
					plugins: [
						// 支持类属性'='赋值插件
						"@babel/plugin-proposal-class-properties",
					],
				},
			},
		],
	},
	// 插件配置
	plugins: [
		//数组 放着所有的webpack插件
		new HtmlWebpackPlugin({
			title: "webpack",
			template: "./public/index.html",
			filename: "index.html", //打包后的文件名
		}),
		// devtool
		new webpack.SourceMapDevToolPlugin({}),
		new CleanWebpackPlugin(),
	],
	// webpack server
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		client: {
			progress: true,
		},
		compress: true,
		port: 7777,
	},
	// 模块解析
	resolve: {
		extensions: [".jsx", "..."], // import 自动不全后缀
	},
};
