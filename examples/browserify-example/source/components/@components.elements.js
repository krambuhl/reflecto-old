const modules = require('./**/!(*.examples|*.test).js', { hash: true, resolve: ['path', 'strip-ext'] })

module.exports = require('@shared/createModuleMap')(modules)
