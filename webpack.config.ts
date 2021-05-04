import { Configuration } from "webpack";
import * as path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: Configuration = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    app: path.join(__dirname, "src", "index.tsx"),
    background: path.join(__dirname, "src", "background", "index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: {
          loader: "ts-loader",
        },
        exclude: ["/src/background/", "/node_modules/"],
      },
      {
        test: /background\/\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: "tsconfig.background.json",
          },
        },
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, "dist"),
            },
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          { loader: "postcss-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  target: ["web", "es5"],
};

export default config;
