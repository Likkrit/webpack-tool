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
  if ((pathname + "").indexOf('png')>0 || (pathname + "").indexOf('jpg')>0 ) {
    console.log('跳过图片：' + pathname);
    return;
  }
  var fileContent = fs.readFileSync(pathname, 'utf-8');
  var newCon = fileContent;
  // var key = '(=|url\\()(.?)(\/assets)(.+.(jpg|png))';
  for (var i = 0; i < rules.length; i++) {
    if(rules[i].replaceTo){
      newCon = newCon.replace(new RegExp(rules[i].key, 'ig'), "$1$2" + rules[i].paddingLeft + rules[i].replaceTo + "$5$6");
    }
    else{
      newCon = newCon.replace(new RegExp(rules[i].key, 'ig'), "$1$2" + rules[i].paddingLeft + "$3$4");
    }
  }
  if(newCon != fileContent){
    fs.writeFileSync(pathname, newCon);
    console.log('替换文件：' + pathname);
  }
};

var parseKey = function(config) {
  var rule, key, obj;
  for (var i = 0; i < config.rules.length; i++) {
    rule = config.rules[i];
    rule.content = rule.content.replace(/\//g, '\\/');
    rule.content = rule.content.replace(/\./g, '\\.');
    // '(=|url\\()(.?)(\/assets)(.+.(jpg|png))'
    key = '(=|url\\()(.?)' + '(' + rule.content + ')';
    key += '((.+.)(' + rule.suffix + '))';
    obj = {
      key: key,
      paddingLeft: config.rules[i].paddingLeft || "",
      replaceTo: config.rules[i].replaceTo || ""
    };
    rules.push(obj);
    console.log('\nreplace all HTML files with : ' + key);
  }
};


module.exports = function(config) {
  config = config || {};
  parseKey(config);
  travel(config.path || './dist');
};
