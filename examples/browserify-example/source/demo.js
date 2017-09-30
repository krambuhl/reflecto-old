import { startDemo } from 'reflecto/demo'

const archive = global.ElementArchive
const rootEl = document.querySelector('.root')

global.renderDemo = startDemo(rootEl, {
  archive,
  onStart () {
    // inject css from elements
    Object.keys(archive.allElements).forEach((key) => {
      const module = archive.allElements[key]

      if (module.styles) {
        module.styles.attach()
      }
    })
  }
})
