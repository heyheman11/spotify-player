const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === "development" }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /.(jpg|jpeg|png|gif)$/,
        use: ["url-loader"]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      fileName: "[name].bundle.css"
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  }
};
