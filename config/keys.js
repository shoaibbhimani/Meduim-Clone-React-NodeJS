let keys = "";
if (process.env.NODE_ENV === "production") {
  keys = require("./prod.js");
} else {
  keys = require("./dev.js");
}

module.exports = keys;
