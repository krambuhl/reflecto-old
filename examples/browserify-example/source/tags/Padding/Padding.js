import { html, classList } from '@shared/html'
import jss from '@shared/jss'

export const Padding = (props = { }, children = '') => {
  const { classes } = Padding.styles
  const {
    variant = 'medium',
    className,
    ...attrs
  } = props

  const classStack = classList`${classes[variant]} ${className}`

  return html(props)`<div class="${classStack}" ${attrs}>${children}</div>`
}

Padding.styles = jss.createStyleSheet({
  small: { padding: '0.5em' },
  medium: { padding: '1em' },
  large: { padding: '2em' }
})

export default Padding
