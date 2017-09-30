import { html, classList } from '@shared/html'
import jss from '@shared/jss'

import { Button, Heading } from '@tags'

export const User = (props = { }) => {
  const { classes } = User.styles
  const {
    variant = 'default',
    className,
    ...attrs
  } = props

  const classStack = classList`${classes.root} ${classes[variant]} ${className}`

  return html`
    <div class="${classStack}" ${attrs}>
      ${Heading({ level: 'h3' }, 'Sign In')}
      ${Button({ tagName: 'a', attrs: { href: '#' } }, 'Sign In')}
    </div>
  `
}

User.styles = jss.createStyleSheet({
  root: { },
  default: { }
})

export default User
