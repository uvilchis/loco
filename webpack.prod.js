const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge(config, {
  plugins: [
    new UglifyJSPlugin(),
    new CleanWebpackPlugin([DIST], {
      exclude: ['index.html', 'main.css']
    })
  ]
});