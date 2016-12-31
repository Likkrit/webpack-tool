var fs = require("fs");
var uglifyJS = require("uglifyjs");
var min = uglifyJS.minify("./replace.js", {});
fs.writeFileSync('./replace.min.js', min.code);
min = uglifyJS.minify("./folder.js", {});
fs.writeFileSync('./folder.min.js', min.code);
