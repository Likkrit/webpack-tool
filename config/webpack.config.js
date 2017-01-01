var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var path = require("path");

module.exports = {
  srcPath: path.resolve(__dirname, "../src"),
  entry: {
    app: path.resolve(__dirname, "../src/bundle.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    // path: './dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(jpg|png)$/,
      loader: "url"
    }, ]
  },
  plugins: [
    new ProgressBarPlugin(),
  ],
  devServer: {
    inline: true
  }
};
