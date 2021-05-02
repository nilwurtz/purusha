import { Configuration } from "webpack";
import * as path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: Configuration = {
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
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  target: ["web", "es5"],
};

export default config;
