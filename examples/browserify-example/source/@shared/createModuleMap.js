module.exports = (modules) =>
  Object.keys(modules).reduce((all, key) => {
    const module = modules[key]
    const moduleKey = key.substr(2).substr(0, key.indexOf('/', 2) - 2)

    if (moduleKey && key.indexOf('/', 2) !== -1) {
      all[moduleKey] = module.default || module
    }

    return all
  }, { })
