const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = {
  context: path.resolve(__dirname, "./src"),
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "./dist"), //必须是绝对路径
    filename: "[chunkhash].bundle.js",
    clean: true,
  },
  // loader 规则
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/, // 过滤样式文件
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
  // 模块解析
  resolve: {
    extensions: [".jsx", "..."], // import 自动不全后缀
  },
};

module.exports = (env, argv) => {
  const plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      title: "ts_test",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html", //打包后的文件名
    }),
    // css 分离
    new MiniCssExtractPlugin({
      filename: "[chunkhash]_[name].css",
    }),
  ];
  const optimization = {
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
  };
  const devServer = {
    client: {
      logging: "error",
      progress: true,
      overlay: true,
    },
    open: true,
    port: 9999,
  };

  if (argv.mode === "development") {
    plugins.push(new webpack.SourceMapDevToolPlugin({}));
    baseConfig.devtool = false;
    baseConfig.plugins = plugins;
    baseConfig.devServer = devServer;
  }

  if (argv.mode === "production") {
    baseConfig.plugins = plugins;
    baseConfig.optimization = optimization;
  }

  console.log(`运行环境 ${argv.mode}`);

  return baseConfig;
};
