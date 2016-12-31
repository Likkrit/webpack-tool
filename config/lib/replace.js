// 文件内容正则替换

// Created By likkrit
// http://likkrit.com
// 2016.12.31

/*
传入参数:
{
  path: "./dist",
  rules: [{
      content: "/assets",
      suffix: "jpg|css",
      paddingLeft: "http://likkrit.com"
    }
    ,{
    content: "/assets",
    suffix: "css|js|png|jpg",
    paddingLeft: "http://likkrit.com"
    }
    ,{
      content: "/assets/images/",
      suffix: "jpg|png",
      paddingLeft: "http://likkrit.com"
    }
  ]
}
*/
// 引入fs文件处理模块
var fs = require("fs");
var path = require("path");
var rules = [];
var travel = function(dir) {
  fs.readdirSync(dir).forEach(function(file) {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      // console.log("目录：" + pathname);
      travel(pathname);
    } else {
      fileReplace(pathname);
    }
  });
};
var fileReplace = function(pathname) {
  var fileContent = fs.readFileSync(pathname, 'utf-8');
  var newCon = fileContent;
  // var key = '(=|url\\()(.?)(\/assets)(.+.(jpg|png))';
  for (var i = 0; i < rules.length; i++) {
    newCon = newCon.replace(new RegExp(rules[i].key, 'ig'), "$1$2" + rules[i].paddingLeft + "$3$4");
  }
  fs.writeFileSync(pathname, newCon);
};

var parseKey = function(config) {
  var rule, key, obj;
  for (var i = 0; i < config.rules.length; i++) {
    rule = config.rules[i];
    // '(=|url\\()(.?)(\/assets)(.+.(jpg|png))'
    key = '(=|url\\()(.?)' + '(' + rule.content.replace(/\//g, '\\/') + ')';
    key += '(.+.(' + rule.suffix + '))';
    obj = {
      key: key,
      paddingLeft: config.rules[i].paddingLeft
    };
    rules.push(obj);
    console.log('replace all HTML files with : ' + key);
  }
};


module.exports = function(config) {
  config = config || {};
  parseKey(config);
  travel(config.path || './dist');
};
