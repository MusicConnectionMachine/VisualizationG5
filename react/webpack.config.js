/* eslint-disable no-var */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

console.log('Compiling with NODE_ENV = ' + (process.env.NODE_ENV || 'unset')); // eslint-disable-line no-console

module.exports = {
  entry: {
    firstSampleApp: './src/first-sample-app.js',
    secondSampleApp: './src/second-sample-app.js',
    personGraph: './src/person-graph.js',
  },
  output: {
    path: __dirname + '/../express/react',
    filename: '[name].bundle.js',
    chunkFilename: '[id].[hash].bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      visualizationG5: __dirname + '/src',
    },
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint' },
      { test: /\.scss$/, include: /components/, exclude: /node_modules/, loader: 'style!css?module!autoprefixer!sass' },
      { test: /\.scss$/, include: path.normalize(__dirname + '/src/scss/first-sample-app.scss'), loader: 'style!css!autoprefixer!sass' },
      { test: /\.scss$/, include: path.normalize(__dirname + '/src/scss/second-sample-app.scss'), loader: 'style!css!autoprefixer!sass' },
      { test: /\.css$/, include: /node_modules/, loader: 'style!css!autoprefixer' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.png$/, loader: 'file' },
      { test: /(\.woff2|\.woff|\.ttf|\.eot|\.svg)(\?.*)?$/, loader: 'file' },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: 'first-sample-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['firstSampleApp'],
    }),
    new HtmlWebpackPlugin({
      filename: 'second-sample-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['secondSampleApp'],
    }),
    new HtmlWebpackPlugin({
      filename: 'person-graph.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['personGraph'],
    }),
  ],
  sassLoader: {
    includePaths: [
      __dirname + '/src/scss',
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.DedupePlugin());
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: [],
    },
  }));
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.devtool = 'inline-source-map';
}