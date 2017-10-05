import bel from 'bel'

// wrap bel in a function to expose props to styleguide
// call like html(props)`template`
export const html = (props) => (...args) => {
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
