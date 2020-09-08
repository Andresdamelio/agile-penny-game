const path = require("path");

module.exports = {
  pages: {
    index: {
      entry: "./src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Penny Game",
    },
  },
};
