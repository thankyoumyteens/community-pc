var entry = require('./webpack.entry.js');

module.exports = {
  entry: entry.devEntry(),
  output: entry.devOutput,
  module: entry.rules,
  plugins: entry.devPlugins()
};