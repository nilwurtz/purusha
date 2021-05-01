import { Configuration } from "webpack";
import * as path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin"

const config: Configuration = {
  entry: {
    // app: path.join(__dirname, "src", "index.tsx"),
    content_script: path.join(__dirname, "src", "content_script.ts"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: "ts-loader",
        },
        exclude: "/node_modules/",
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist/*"]
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};

export default config;
