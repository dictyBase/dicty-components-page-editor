const path = require("path")
module.exports = {
  styleguideDir: "styleguide",
  webpackConfig: require("react-scripts/config/webpack.config")("development"),
  ignore: [
    "**/*.test.{js,jsx,ts,tsx}",
    "src/styles/*.js",
    "src/components/editorStyles.js",
    "src/components/schema/*.js",
    "src/components/flow/types.js",
    "src/components/utils/*.js",
  ],
}
