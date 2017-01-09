var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config.js');
var path = require("path");


var port = 8080;

// 增加热插拔支持
// if (Array.isArray(webpackConfig.entry.common)) {
//   webpackConfig.entry.common.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
// } else {
//   webpackConfig.entry = [
//     "webpack-dev-server/client?http://localhost:8080/",
//     "webpack/hot/dev-server",
//     webpackConfig.entry.common,
//     webpackConfig.entry.pageA,
//   ]
// }
// webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());


webpackConfig.output = {
  path: path.resolve(__dirname, "../dist/entry"), //这一句对webpack dev server无效，但必须存在，实际起作用在下面的publicPath。
  filename: '[name].js', // 同名覆盖，优先读取内存的文件。
};

// // js压缩混淆 兼容IE8
// webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compress :{
//     screw_ie8 : false,
//   },
//   output :{
//     screw_ie8 : false,
//     semicolons : false,
//   },
//     // mangle: false,
// }));

var compiler = webpack(webpackConfig);

var server = new webpackDevServer(compiler, {
  // hot: true,
  contentBase: webpackConfig.srcPath,
  stats: {
    colors: true
  },
 //  proxy: {
 //   '/api/*': {
 //       target: 'http://likkrit.com/',
 //       secure: false,
 //   }
 // },
  noInfo: true,
  publicPath: "/entry/",
}).listen(port,function(){
  console.log("----\n\n服务监听于：http://127.0.0.1:" + port + " 按下Ctrl+C结束\n\n----\n");
});
