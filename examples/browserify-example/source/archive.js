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

// import all project assets
import Tags from '@tags'
import TagExamples from '@tags.examples'
import TagReadmes from '@tags.readmes'

import Components from '@components'
import ComponentExamples from '@components.examples'
import ComponentReadmes from '@components.readmes'

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
  const groups = [{
    filter: filterByAttributes({ pageType: undefined })
  }, {
    title: 'Actions',
    filter: filterByAttributes({ pageType: 'action' })
  }, {
    title: 'Forms',
    filter: filterByAttributes({ pageType: 'form' })
  }, {
    title: 'Layout',
    filter: filterByAttributes({ pageType: 'layout' })
  }, {
    title: 'Typography and Content',
    filter: filterByAttributes({ pageType: 'content' })
  }, {
    title: 'Behavior',
    filter: filterByAttributes({ pageType: 'behavior' })
  }]

  return createSchema(allElements, [{
    title: 'Tags',
    filter: filterByKey(/Tags/),
    groups
  }, {
    title: 'Components',
    filter: filterByKey(/Components/),
    groups
  }])
}

// rendering

// Provide render fn for browser
export const renderComponentBrowser = (el, component) => {

}

// Provide render fn for node
export const renderComponentServer = (component) => {
  return component()
}

// routing / links
export const createDemoLink = (type, name, id) =>
  `demo.html?type=${type}&name=${name}&id=${id}`