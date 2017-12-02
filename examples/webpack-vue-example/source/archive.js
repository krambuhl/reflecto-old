// This is an archive file, it contains:
// - all project elements, examples, and readmes
// - a way to categorize and structure elements
// - utilities for rendering elements

import {
  createArchive,
  createSchema,
  registerHelpers,
  archiveHelpers
} from 'reflecto-archive'
import Handlebars from 'handlebars/runtime'
import * as Categories from '@shared/categories'

const {
  groupFilesByDirectory,
  elementStrategy,
  pageStrategy
} = archiveHelpers

registerHelpers(Handlebars)

const fileContext = require.context('./', true, /(.vue|.data.js|.md)$/)
const files = fileContext.keys()
  .reduce((list, path) => {
    list[path.substr(2)] = fileContext(path)
    return list
  }, {})

// export all elements
export const archive =
  createArchive(files)
    .reduce(groupFilesByDirectory({
      skip: (def) => def.directory.match(/pages/)
    }), [])
    .map((def) => {
      if (def.directory.match(/pages/)) {
        return pageStrategy(def)
      }

      return elementStrategy(def, {
        findElement: def => def.files.find(f => f.filename === `${def.elementName}.vue`).contents,
        findData: def => def.files.find(f => f.filename === `${def.elementName}.data.js`).contents,
        findReadme: def => def.files.find(f => f.filename === 'README.md').contents(def.data)
      })
    })

// defines a way to structure data in users
// of the archive
export const schema =
  createSchema(archive, [{
    title: 'Pages',
    filter: def => def.isPage
  }, {
    title: 'Identity',
    filter: def => def.elementType === 'identity'
  }, {
    title: 'Tags',
    filter: def => def.elementType === 'tags',
    groups: [{
      filter: def => def.element.category === Categories.Default
    }]
  }])

// Provide render fn for browser
export const renderComponent = (el, component, engine = 'vue') => {
  new Vue({
    el,
    render: component
  })
}
