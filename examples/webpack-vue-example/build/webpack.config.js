const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackOnBuildPlugin = require('on-build-webpack')
const copyStyleguide = require('reflecto-styleguide')

const { dest, source } = require('./helpers')

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    archive: source('archive.js')
  },
  output: {
    path: dest(),
    filename: '[name].js',
    library: 'ElementArchive',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@shared': source('@shared'),
      '@identity': source('identity'),
      '@tags': source('tags'),
      '@components': source('components')
    }
  },
  plugins: [
    new WebpackOnBuildPlugin((stats) => {
      copyStyleguide({
        archiveName: 'ElementArchive',
        outputDirectory: 'dist',
        indexContent: `
          <script src="archive.js"></script>
        `
      })
    }),
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: path.resolve(__dirname, 'templates/demo-template.html'),
      inject: true
    })
  ],
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /\.js$/, loader: 'babel-loader?cacheDirectory=true', exclude: /node_modules/ },
      { test: /README.md$/, loader: 'handlebars-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
}
