// This is an archive file, it contains:
// - all project elements, examples, and readmes
// - a way to categorize and structure elements
// - utilities for rendering elements

import {
  mapModules,
  mapExamples,
  createSchema
} from 'reflecto-archive'

import * as Categories from '@shared/categories'

// import all project assets
import Tags from '@tags.elements'
import TagExamples from '@tags.examples'
import TagReadmes from '@tags.readmes'

import Components from '@components.elements'
import ComponentExamples from '@components.examples'
import ComponentReadmes from '@components.readmes'

const tagType = { type: 'tags' }
const componentType = { type: 'components' }

// export all elements
export const elements = [
  ...mapModules(Tags, tagType),
  ...mapModules(Components, componentType)
]

// export all examples
export const examples = [
  ...mapExamples(TagExamples, tagType),
  ...mapExamples(ComponentExamples, componentType)
]

// export all readmes
export const readmes = [
  ...mapModules(TagReadmes, tagType),
  ...mapModules(ComponentReadmes, componentType)
]

// defines a way to structure data in users
// of the archive
export const schema =
  createSchema(elements, [{
    title: 'Tags',
    filter: def => def.type === 'tags',
    groups: [{
      filter: def => def.module.category === undefined
    }, {
      title: 'Forms',
      filter: def => def.module.category === Categories.Form
    }, {
      title: 'Layout',
      filter: def => def.module.category === Categories.Layout
    }]
  }, {
    title: 'Components',
    filter: def => def.type === 'components'
  }])

// Provide render fn for browser
export const renderComponent = (el, component) => {
  el.innerHTML = ''
  el.appendChild(component)
}
