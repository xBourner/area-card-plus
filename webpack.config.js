const path = require("path");

module.exports = {
  mode: "production", // Oder 'production', je nach Bedarf
  entry: "./src/index.ts",
  output: {
    filename: "area-card-plus.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "source-map",
};
