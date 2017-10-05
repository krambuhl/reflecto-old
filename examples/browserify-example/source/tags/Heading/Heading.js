import { html, classList } from '@shared/html'
import jss from '@shared/jss'

export const Heading = (props = { }, children = '') => {
  const { classes } = Heading.styles
  const {
    variant = 'h1',
    className,
    ...attrs
  } = props

  const classStack = classList`${classes.root} ${classes[variant]} ${className}`

  switch (variant) {
    case 'h6': return html(props)`<h6 class="${classStack}" ${attrs}>${children}</h6>`
    case 'h5': return html(props)`<h5 class="${classStack}" ${attrs}>${children}</h5>`
    case 'h4': return html(props)`<h4 class="${classStack}" ${attrs}>${children}</h4>`
    case 'h3': return html(props)`<h3 class="${classStack}" ${attrs}>${children}</h3>`
    case 'h2': return html(props)`<h2 class="${classStack}" ${attrs}>${children}</h2>`
    case 'h1':
    default:
      return html(props)`<h1 class="${classStack}" ${attrs}>${children}</h1>`
  }
}

Heading.styles = jss.createStyleSheet({
  root: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    lineHeight: '1.2em'
  },
  h1: { fontSize: '2.4em;' },
  h2: { fontSize: '2.1em;' },
  h3: { fontSize: '1.8em;' },
  h4: { fontSize: '1.5em;' },
  h5: { fontSize: '1.35em;' },
  h6: { fontSize: '1.2em;' }
})

export default Heading
