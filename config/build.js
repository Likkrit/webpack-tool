var folder = require("./lib/folder");
var replace = require("./lib/replace");
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');


// 删除dist目录
folder.deleteFolder('./dist');

console.log("开始进行打包...");

// 新建临时目录
folder.copyFolder('./src', './temp');
// 替换临时目录里html和css、js的路径
replace({
  path: "./temp",
  rules: [{
    content: "/assets",
    suffix: "jpg|png",
    paddingLeft: "http://likkrit.com"
  }]
});
// 将替换好后的文件复制到dist目录，准备进行打包
folder.copyFolder('./temp', './dist');

// 由于JS和CSS打包到了bundle.js里，所以删除多余目录...
console.log("删除文件...");
folder.deleteFolder('./dist/assets/js');
folder.deleteFolder('./dist/assets/css');

// 进行css、js和图片资源打包
console.log("完成html页面打包...\n开始静态资源打包...");

// 指定webpack打包路径为临时目录
webpackConfig.entry = webpackConfig.entry.app[0].replace(/src/,'temp');
// js文件压缩，减小体积
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, output: {comments: false} }));

// 调用webpack
var compiler = webpack(webpackConfig,  (err, stats) => {
  if (err || stats.hasErrors()) {
  }
  // 打包成功后，删除临时目录
  folder.deleteFolder('./temp');
  console.log("----\n\n构建成功，请查看dist目录\n\n----");
});
