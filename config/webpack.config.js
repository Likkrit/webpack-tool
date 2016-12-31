module.exports = {
  entry: './src/bundle.js',
  output: {
    path: './dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(jpg|png)$/,
      loader: "url"
    }, ]
  }
};
