const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/index.js'),
  output: {
    path: path.join(__dirname, 'client/public/build'),
    filename: 'main.js',
  },
  node: {
    fs: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          optional: [
            'runtime',
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      webgl: path.join(__dirname, '/client/src/webgl'),
      shared: path.join(__dirname, '/shared'),
      config: path.join(__dirname, '/config'),
    },
  },
  stylus: {
    use: [autoprefixer({ browsers: ['> 5%'] })],
  },
  eslint: {
    configFile: path.join(__dirname, '/.eslintrc'),
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
  ],
};
