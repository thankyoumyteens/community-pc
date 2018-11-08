const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.entryList = {
  'index': './src/static/script/pages/index/index.jsx',
  'forum-index': './src/static/script/pages/forum/forum-index/forum-index.jsx',
};

exports.devEntry = function () {
  let res = {};
  let entry = exports.entry();

  for (let key in entry) {
    if (entry.hasOwnProperty(key)) {
      // entry[key] = entry[key].replace(/\/src/g, '');
      res[key] = ['webpack-hot-middleware/client', entry[key]];
    }
  }

  return res;
};

exports.entry = function () {
  let entry = {};
  let entryList = exports.entryList;

  for (let key in entryList) {
    if (entryList.hasOwnProperty(key)) {
      entry[key] = entryList[key];
    }
  }

  return entry;
};

exports.devOutput = {
  filename: '[name].js',
  path: path.resolve(__dirname, 'static/js'),
  publicPath: '/static/js'
};

exports.output = {
  filename: '[name].[hash].js',
  path: path.resolve(__dirname, '../static/js')
};

exports.rules = {
  rules: [{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader']
    })
  }, {
    test: /\.(png|jpg|gif|jpeg)$/,
    use: [{
      loader: 'url-loader',
      options: {limit: 8192}
    }]
  }, {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-env', 'babel-preset-stage-2', 'babel-preset-react'],
        plugins: [['babel-plugin-import', {
          'libraryName': 'antd',
          'libraryDirectory': 'es',
          'style': 'css'
        }], ['babel-plugin-transform-decorators-legacy', {}]]
      }
    }
  }]
};

exports.devPlugins = function () {
  let plugins = [];

  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ExtractTextPlugin({
    filename: 'common.css',
    allChunks: true
  }));
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: exports.entryCommon,
    filename: 'common.js',
    minChunks: 2
  }));

  return plugins;
};

exports.plugins = function () {
  let plugins = [];

  plugins.push(new CleanWebpackPlugin('./static/js', {
    root: path.resolve(__dirname, '../')
  }));
  plugins.push(new ExtractTextPlugin({
    filename: 'common.[hash].css',
    allChunks: true
  }));
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: exports.entryCommon,
    filename: 'common.[hash].js',
    minChunks: 2
  }));

  return plugins;
};
