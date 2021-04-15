const path = require("path")
module.exports = {
  styleguideDir: "styleguide",
  title: "Dicty Components Page Editor",
  ignore: ["src/__tests__/**"],
  propsParser: require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json",
  ).parse,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: { configFile: "tsconfig.styleguidist.json" },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          loader: "url-loader",
          options: {
            limit: 8192,
          },
        },
      ],
    },
  },
}
