import { elements } from './archive'

// inject css from elements
elements.forEach(({ module }) => {
  if (module.styles) {
    module.styles.attach()
  }
})
