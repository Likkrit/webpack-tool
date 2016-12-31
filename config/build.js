var folder = require("./lib/folder");
var replace = require("./lib/replace");

folder.deleteFolder('./dist');
console.log("开始进行打包...");
folder.copyFolder('./src', './dist');

console.log("删除文件...");

// 由于JS和CSS打包到了bundle.js里，所以删除多余目录...
folder.deleteFolder('./dist/assets/js');
folder.deleteFolder('./dist/assets/css');

// 替换html文件内的路径
replace({
  path: "./dist",
  rules: [{
      content: "/assets",
      suffix: "jpg|css",
      paddingLeft: "http://likkrit.com"
    }]
});

console.log("完成html页面打包...开始静态资源打包...");





require('../node_modules/webpack/bin/webpack');
