/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

const { configure } = require("quasar/wrappers");
const path = require("path");

module.exports = configure(function (/* ctx */) {
  return {
    // Quasar 配置
    boot: ["i18n", "axios"],

    css: ["app.scss"],

    extras: ["roboto-font", "material-icons"],

    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node20",
      },
      vueRouterMode: "hash", // 或 'history'
      vitePlugins: [
        [
          "@intlify/vite-plugin-vue-i18n",
          {
            include: path.resolve(__dirname, "./src/i18n/**"),
          },
        ],
        [
          "vite-plugin-checker",
          {
            eslint: {
              lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},
      plugins: [],
    },

    animations: [],
  };
});
