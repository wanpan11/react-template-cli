const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, "./src"),
  // 运行模式
  mode: isDev ? "development" : "production",
  entry: "./main.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "./dist"), //必须是绝对路径
    filename: "[chunkhash].bundle.js",
    clean: true,
    publicPath: "/", //通常是CDN地址
  },
  optimization: {
    minimize: true,
    emitOnErrors: true,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          filename: "[name].vendor.js",
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // loader 规则
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/, // 过滤样式文件
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.js/, // 配置js和jsx的loader
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
                useBuiltIns: "usage",
                corejs: "3",
              },
            ],
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
        },
      },
    ],
  },
  // 插件配置
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: "ts_test",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html", //打包后的文件名
    }),
    // css 分离
    new MiniCssExtractPlugin(),
    // devtool
    new webpack.SourceMapDevToolPlugin({}),
  ],
  // webpack server
  devServer: {
    client: {
      progress: true,
    },
    port: 9999,
  },
  // 模块解析
  resolve: {
    extensions: [".jsx", "..."], // import 自动不全后缀
  },
};
