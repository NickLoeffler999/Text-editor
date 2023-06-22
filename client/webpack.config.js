const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const WorkboxPlugin = require("workbox-webpack-plugin");
// TODO: Add CSS loaders and babel to webpack.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "My New Text Editor",
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: false,
        name: "My New Text Editor",
        short_name: "MNTE",
        description: "A simple text editor",
        background_color: "#ffffff",
        theme_color: "#000000",
        start_url: "/",
        public_path: "/",
        icons: [
          {
            src: path.resolve("src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel-plugin-proposal-object-rest-spread",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      ],
    },
  };
};
