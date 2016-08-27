var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index',
  },

  output: {
    path: path.resolve('build'),
    filename: 'js/[name].js',
    publicPath: '/static/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: './src/index.html'
    })
  ],

  devServer: {
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
