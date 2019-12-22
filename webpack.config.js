const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
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
      template: "index.html"
    })
    // new MiniCssExtractPlugin({
    //   filename: "[name].css"
    // })
  ],
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
