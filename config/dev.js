var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var path = require("path");
var fs = require('fs');
var express = require('express');
var app = express();
var serveIndex = require("serve-index");
var src = 'src';
var port = 8080;

app.use(require('webpack-dev-middleware')(webpack(webpackConfig), {
  contentBase: webpackConfig.srcPath,
  stats: {
    colors: true
  },
  noInfo: true,
  publicPath: "/entry/",
}));


app.get("*", function(req, res, next) {
  var contents, fpath, ffolder, index;

  // 访问具体文件
  if (new RegExp('(.+.s?html)', 'ig').test(req.path)) {
    // 当前文件的绝对路径
    fpath = path.join(__dirname, "..", src, req.path);
    index = fileExists([fpath]);
    // 当前文件所在目录的绝对路径
    ffolder = path.resolve(path.dirname(index));
    // 访问文件存在
    if (index) {
      contents = fs.readFileSync(index, 'utf-8');
      contents = includeReplace(contents,ffolder);
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.end(contents);
      return;
    }
  }

  // 访问目录
  if (new RegExp('\\/$', 'ig').test(req.path)) {
    var fpath1 = path.join(__dirname, "..", src, req.path + 'index.html');
    var fpath2 = path.join(__dirname, "..", src, req.path + 'index.shtml');
    index = fileExists([fpath1, fpath2]);
    ffolder = path.resolve(path.dirname(index));
    if (index) {
      contents = fs.readFileSync(index, 'utf-8');
      contents = includeReplace(contents,ffolder);
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.end(contents);
      return;
    }
  }
  // 没有匹配到以上规则 传递到下一层
  next();
});

app.get("*", express.static(webpackConfig.srcPath), serveIndex(webpackConfig.srcPath));


app.listen(port, function() {
  console.log('\nlistening at http://%s:%s\n', '127.0.0.1', port);
});




/* 相关方法 */
var includeReplace = function(fileContent,ffolder) {
  return fileContent.replace(/<!--\s?#include\sfile=\\?[\'\"][^\'\"]+\\?[\'\"]\s?-->/ig, function(str) {
    var childfilePath = str.replace(/[\\\'\"\>\(\);\s<!=-]/g, '').replace('#includefile', '');
    var childfileContent;
    childfilePath = new RegExp('^\\/', 'ig').test(childfilePath) ? path.join(__dirname, "..", src, childfilePath) : path.join(ffolder, childfilePath);
    try {
      childfileContent = fs.readFileSync(childfilePath, 'utf-8');
    } catch (e) {
      console.log('' + e);
      return ('<br>\n' + e + '<br>\n');
    }
    return childfileContent;
  });
};

var fileExists = function(array) {
  var st;
  for (var i = 0; i < array.length; i++) {
    try {
      st = fs.statSync(array[i]);
    } catch (err) {
      continue;
    }
    if (st.isFile()) {
      return array[i];
    }
  }
  return '';
};
