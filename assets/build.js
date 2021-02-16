const fs = require("fs-extra");
const path = require("path");

const esbuild = require("esbuild");
const sassPlugin = require("esbuild-plugin-sass");

const watch = process.argv.includes("--watch");
const outdir = path.resolve(__dirname, "../priv/static/");

esbuild
  .build({
    entryPoints: ["js/app.js"],
    bundle: true,
    minify: true,
    logLevel: "info",
    watch: watch,
    target: ["es2016", "safari10"],
    loader: {
      ".png": "dataurl",
      ".svg": "text",
      ".woff": "file",
      ".woff2": "file",
      ".ttf": "file",
      ".eot": "file",
    },
    outdir: outdir,
    plugins: [sassPlugin()],
  })
  .then(() => fs.copy("static/", outdir))
  .catch((e) => console.error(e.message));
