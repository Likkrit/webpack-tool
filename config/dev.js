var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js');
var port = 8080;

// 增加热插拔支持
if (Array.isArray(webpackConfig.entry.app)) {
  webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
} else {
  webpackConfig.entry = [
    "webpack-dev-server/client?http://localhost:8080/",
    "webpack/hot/dev-server",
    webpackConfig.entry.app
  ]
}
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


console.log("----\n\n调试地址：http://127.0.0.1:" + port + "\n\n----\n");

var compiler = webpack(webpackConfig);
var server = new webpackDevServer(compiler, {
  hot: true,
  contentBase: webpackConfig.srcPath,
  stats: {
    colors: true
  },
  noInfo: true,
});

server.listen(port);
