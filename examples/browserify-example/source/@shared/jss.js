// Setup jss plugins.
import { create } from 'jss'
import preset from 'jss-preset-default'
import template from 'jss-template'

const jss = create({
  ...preset()
})

jss.use(template())

export default jss
