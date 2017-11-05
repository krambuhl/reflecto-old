// This is an archive file, it contains:
// - all project elements, examples, and readmes
// - a way to access elements, examples, and readmes
// - a way to categorize and structure elements
// - utilities for rendering elements

import {
  flattenModules,
  createSchema,
  filterByAttributes,
  filterByKey
} from 'reflecto/archive'

import * as Categories from '@shared/categories'

// import all project assets
import Tags from './tags/@tags.elements'
import TagExamples from './tags/@tags.examples'
import TagReadmes from './tags/@tags.readmes'

import Components from './components/@components.elements'
import ComponentExamples from './components/@components.examples'
import ComponentReadmes from './components/@components.readmes'

// provide a list of all elements in the project
export const allElements = flattenModules({
  Tags,
  Components
}, {})

// provide an outlet to find an element
export const getElement = (type, name) =>
  allElements[`${type}/${name}`]

// provide a list of all example files in the project
export const allExamples = flattenModules({
  Tags: TagExamples,
  Components: ComponentExamples
}, {})

// provide an outlet to find an element's example
export const getExample = (type, name, id) =>
  allExamples[`${type}/${name}/${id}`]

// gets all examples for an element
export const getExamples = (type, name) =>
  Object.keys(allExamples)
    .filter((key) => key.indexOf(`${type}/${name}`) >= 0)
    .reduce((all, key) => {
      all[key] = allExamples[key]
      return all
    }, {})

// provide a list of all readme files in the project
export const allReadmes = flattenModules({
  Tags: TagReadmes,
  Components: ComponentReadmes
}, {})

// provide an outlet to find a element's readme
export const getReadme = (type, name) =>
  allReadmes[`${type}/${name}`]

// defines a way to structure data in users
// of the archive
export const getSchema = () => {
  return createSchema(allElements, [{
    title: 'Tags',
    filter: filterByKey(/Tags/),
    groups: [{
      filter: filterByAttributes({ category: undefined })
    }, {
      title: 'Forms',
      filter: filterByAttributes({ category: Categories.Form })
    }, {
      title: 'Layout',
      filter: filterByAttributes({ category: Categories.Layout })
    }]
  }, {
    title: 'Components',
    filter: filterByKey(/Components/)
  }])
}

// rendering

// Provide render fn for browser
export const renderComponent = (el, component) => {
  el.innerHTML = ''
  if (typeof component === 'function') {
    el.appendChild(component())
  } else {
    el.appendChild(component)
  }
}

// routing / links
export const createDemoLink = (type, name, id) => {
  if (id === undefined) {
    return `?type=${type}&name=${name}&id=${id}`
  } else {
    return `?type=${type}&name=${name}`
  }
}

// CSS

// inject css from elements
Object.keys(allElements).forEach((key) => {
  const module = allElements[key]

  if (module.styles) {
    module.styles.attach()
  }
})
