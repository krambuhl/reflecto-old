const path = require('path')

module.exports.root = (...paths) =>
  path.resolve(__dirname, '..', ...paths)

module.exports.source = (...paths) =>
  module.exports.root('source', ...paths)

module.exports.dest = (...paths) =>
  module.exports.root('dist', ...paths)
