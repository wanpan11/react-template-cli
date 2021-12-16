const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: isDev ? "development" : "production",
  entry: "/index.js",
  output: {
    path: path.resolve(__dirname, "dist"), //必须是绝对路径
    filename: "[chunkhash].bundle.js",
    clean: true,
    publicPath: "./", //通常是CDN地址
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
  // 运行模式
  devtool: false,
  // loader 规则
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/, // 过滤样式文件
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.jsx?$/, // 配置js和jsx的loader
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: [
            // 预设
            "@babel/preset-env",
            ,
            "@babel/preset-react",
          ],
          plugins: [
            // 插件
            [
              "@babel/plugin-transform-runtime",
              {
                corejs: 3, // 默认值false，使用2、3时，会抽离ESNEXT的api到沙箱环境
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
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      title: "webpack",
      template: "../public/index.html",
      filename: "index.html", //打包后的文件名
    }),
    // css 分离
    new MiniCssExtractPlugin(),
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
