const modules = require('./**/*.examples.js', { hash: true, resolve: ['path', 'strip-ext'] })

module.exports = require('@shared/createModuleMap')(modules)
