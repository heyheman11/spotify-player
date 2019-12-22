const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(css|scss)$/,
    use: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });

  // Return the altered config
  return config;
};
