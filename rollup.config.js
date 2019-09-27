import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"
import json from "rollup-plugin-json"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import resolve from "rollup-plugin-node-resolve"
import url from "rollup-plugin-url"
import svgr from "@svgr/rollup"

import pkg from "./package.json"

const extensions = [".js", ".jsx"]

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({ extensions, include: ["src/**/*"], exclude: "node_modules/**" }),
    resolve(),
    json({
      compact: true,
    }),
    commonjs({
      namedExports: {
        "node_modules/immutable/dist/immutable.js": [
          "Set",
          "Map",
          "List",
          "Record",
          "OrderedSet",
          "fromJS",
          "is",
          "Stack",
        ],
        "node_modules/esrever/esrever.js": ["reverse"],
      },
    }),
  ],
}
