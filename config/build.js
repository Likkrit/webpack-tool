var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var folder = require("./lib/folder");
var replace = require("./lib/replace");

// 删除dist目录
folder.deleteFolder('./dist');

console.log("开始进行打包...");

// 将src资源复制到dist
folder.copyFolder('./src', './dist');

// 替换临时目录里html和css、js的路径
replace({
  path: "./dist",
  rules: [{
    content: "/assets",
    suffix: "jpg|png",
    paddingLeft: "http://likkrit.com"
  }]
});

// 进行css、js和图片资源打包
console.log("完成html页面打包...\n开始静态资源打包...");


// 指定webpack打包路径为dist目录
webpackConfig.entry = webpackConfig.entry.app.replace(/src/, 'dist');
// js文件压缩，减小体积
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  output: {
    comments: false
  }
}));

// 调用webpack
var compiler = webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {}
  // 由于JS和CSS打包到了bundle.js里，所以删除多余目录...
  console.log("删除文件...");
  folder.deleteFolder('./dist/assets/js');
  folder.deleteFolder('./dist/assets/css');
  console.log("----\n\n构建成功，请查看dist目录\n\n----");
});
