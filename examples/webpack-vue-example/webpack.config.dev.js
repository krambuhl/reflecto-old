const webpackMerge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = webpackMerge(config, {
  devServer: {
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: true
  }
})
