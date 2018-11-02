var entry = require('./webpack.entry.js');

module.exports = {
  entry: entry.entry(),
  output: entry.output,
  module: entry.rules,
  plugins: entry.plugins()
};