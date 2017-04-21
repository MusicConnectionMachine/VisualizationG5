/* eslint-disable no-var */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

console.log('Compiling with NODE_ENV = ' + (process.env.NODE_ENV || 'unset')); // eslint-disable-line no-console

module.exports = {
  entry: {
    homeApp: './src/home-app.js',
    searchApp: './src/search-app.js',
    timelineApp: './src/timeline-app.js',
    personGraph: './src/person-graph.js',
    composersApp: './src/composers-app.js',
    relationsApp: './src/relations-app.js',
    mapApp: './src/map-app.js',
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
      { test: /\.scss$/, include: path.normalize(__dirname + '/scss/'), exclude: path.normalize(__dirname + '/scss/_common.scss'), loader: 'style!css!autoprefixer!sass' },
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
      filename: 'home-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['homeApp'],
    }),
    new HtmlWebpackPlugin({
      filename: 'search-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['searchApp'],
    }),
    new HtmlWebpackPlugin({
      filename: 'timeline-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['timelineApp'],
      }),
    new HtmlWebpackPlugin({
      filename: 'person-graph.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['personGraph'],
    }),
    new HtmlWebpackPlugin({
      filename: 'composers-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['composersApp'],
    }),
    new HtmlWebpackPlugin({
      filename: 'relations-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['relationsApp'],
    }),
    new HtmlWebpackPlugin({
      filename: 'map-app.html',
      template: 'index.html',
      inject: 'body',
      chunks: ['mapApp'],
    }),
  ],
  sassLoader: {
    includePaths: [
      __dirname + '/scss',
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
