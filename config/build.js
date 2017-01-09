var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var path = require("path");

var folder = require("./lib/folder");
var replace = require("./lib/replace");





// 删除dist目录
folder.deleteFolder('./dist');

console.log("开始进行打包...");

// 将src资源复制到dist
folder.copyFolder('./src', './dist');

// 生产环境正则替换，
replace({
  path: "./dist",
  rules: [
    // 替换html内引用的绝对路径的bundle
    {
      content: "/entry/",
      suffix: "js",
      replaceTo: "/bundles/"
    },
    // 替换html内引用的相对路径的bundle
    {
      content: "./entry/",
      suffix: "js",
      replaceTo: "./bundles/"
    },
    // 替换html内引用的两层相对路径的bundle
    {
      content: "../entry/",
      suffix: "js",
      replaceTo: "../bundles/"
    },
    // 替换引用绝对路径的bundles为指定cdn域名
    {
      content: "/bundles/",
      suffix: "js",
      paddingLeft: "http://likkrit.com"
    },
    // 替换引用相对路径的bundles为指定cdn域名 bug待修复
    {
      content: "./bundles/",
      suffix: "js",
      paddingLeft: "http://likkrit.com"
    }
  ]
});

// 进行css、js和图片资源打包
console.log("\n完成html页面打包...\n开始静态资源打包...\n");


// 指定webpack打包路径为dist目录
var newEntry = {};
for (var key in webpackConfig.entry) {
  newEntry[key] = webpackConfig.entry[key].replace(/src/, 'dist');
}
webpackConfig.entry = newEntry;

webpackConfig.output = {
  path: path.resolve(__dirname, "../dist/bundles"),
  filename: '[name].js',
};

// js文件压缩，减小体积
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    screw_ie8: false,
  },
  output: {
    screw_ie8: false,
    semicolons: false, // 是否保留分号
  },
  // mangle: false,
}));

// 调用webpack
var compiler = webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {}
  // 由于JS和CSS打包到了bundle.js里，所以删除多余目录...
  console.log("删除文件...");
  folder.deleteFolder('./dist/assets/js');
  folder.deleteFolder('./dist/assets/css');
  folder.deleteFolder('./dist/entry');
  folder.createFolder('./dist/gg');
  console.log("----\n\n构建成功，请查看dist目录\n\n----");
});
