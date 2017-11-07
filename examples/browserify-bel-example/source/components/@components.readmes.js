const modules = require('./**/*.md', { hash: true, resolve: ['path', 'strip-ext'] })

module.exports = require('@shared/createModuleMap')(modules)
