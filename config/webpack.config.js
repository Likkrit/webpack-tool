var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var path = require("path");
var fs = require('fs');
var entryDir = {};

var travel = function(dir) {
  fs.readdirSync(dir).forEach(function(file) {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname);
    } else {
      pathname.replace(/(entry\/)(.+)(.js)/ig,function(str,p1,p2,p3,oristr){
        entryDir[p2] = path.resolve(process.cwd(), pathname);
      });
    }
  });
};

travel('./src/entry');



module.exports = {
  srcPath: path.resolve(__dirname, "../src"),
  entry : entryDir,
  output : {
    path: path.resolve(__dirname, "../dist/bundles"),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(jpg|png)$/,
      loader: "url"
    },{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new ProgressBarPlugin(),
  ],
  devServer: {
    inline: true,
  },
};
