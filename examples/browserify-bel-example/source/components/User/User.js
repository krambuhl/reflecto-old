import { component, classList } from '@shared/html'
import jss from '@shared/jss'

import { Button, Heading } from '@tags'

export const User = (props = { }) => {
  const { classes } = User.styles
  const {
    variant = 'default',
    name,
    hideAction = false,
    className,
    ...attrs
  } = props

  const classStack = classList`${classes.root} ${classes[variant]} ${className}`

  return component(props)`
    <div class="${classStack}" ${attrs}>
      ${Heading({ level: 'h3' }, `Hello there ${name}!`)}
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque minima vero iste sed corrupti quo blanditiis voluptas distinctio mollitia necessitatibus quisquam laboriosam rerum temporibus dolorum, tenetur in omnis consequatur eius asperiores. Aspernatur itaque laudantium consequatur quas voluptates, dolor ipsam pariatur.</p>

      ${hideAction ? '' : Button({ href: '#' }, 'Sign In')}
    </div>
  `
}

User.styles = jss.createStyleSheet({
  root: {
    '& > * + *': {
      marginTop: '1em'
    }
  },
  default: { }
})

export default User
