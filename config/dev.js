var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js');


// 增加热插拔支持
webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


console.log("----\n\n调试地址：http://127.0.0.1:8080/\n\n----\n");

var compiler = webpack(webpackConfig);
var server = new webpackDevServer(compiler, {
  hot: true,
  contentBase: webpackConfig.srcPath,
  stats: { colors: true },
  noInfo: true,
});

server.listen(8080);
