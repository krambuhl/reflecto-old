import bel from 'bel'

export const html = bel

// wrap bel in a function to expose props to styleguide
// call like component(props)`template`
export const component = (props) => (...args) => {
  const res = bel(...args)
  res.props = props
  return res
}

export const classList = (template, ...exps) =>
  template.reduce((classList, part, i) => {
    const value = exps[i - 1]
    return classList + (value ? value + part : '')
  }).trim()

export const attributes = (template, ...exps) =>
  template.reduce((classList, part, i) => {
    const value = exps[i - 1]
    return classList + (value ? value + part : '')
  }).trim()
