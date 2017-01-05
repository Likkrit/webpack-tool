var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var path = require("path");
var fs = require('fs');

var entryDir = {};
var i,newCon,newConName;
var readDir = fs.readdirSync('./src/entry');
for(i=0;i<readDir.length;i++){
  newCon = readDir[i].replace(/(.+)(.js)/ig,"../src/entry/$1$2");
  newConName = readDir[i].replace(/(.+)(.js)/ig,"$1");
  if(newCon != readDir[i]){
    entryDir[newConName] = path.resolve(__dirname, newCon);
  }
}

module.exports = {
  srcPath: path.resolve(__dirname, "../src"),
  entry : entryDir,
  // entry: {
  //   common: path.resolve(__dirname, "../src/entry/common.js"),
  //   pageA: path.resolve(__dirname, "../src/entry/pageA.js"),
  // },
  // output: {
  //   path: path.resolve(__dirname, "../dist/bundles"),
  //   // path: './dist/',
  //   filename: '[name].js',
  // },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(jpg|png)$/,
      loader: "url"
    }]
  },
  plugins: [
    new ProgressBarPlugin(),
  ],
  devServer: {
    inline: true,
  },
};
