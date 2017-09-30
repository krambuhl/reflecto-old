export { default as html } from 'bel'

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
