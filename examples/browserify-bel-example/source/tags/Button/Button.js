import { component, classList } from '@shared/html'
import jss from '@shared/jss'
import { Form as FormCategory } from '@shared/categories'

export const Button = (props = { }, children = '') => {
  const { classes } = Button.styles
  const {
    variant = 'primary', // secondary, cta
    className,
    ...attrs
  } = props

  const classStack = classList`${classes.root} ${classes[variant]} ${className}`

  return component(props)`
    <button class="${classStack}" ${attrs}>
      ${children}
    </button>
  `
}

Button.styles = jss.createStyleSheet({
  root: {
    appearance: 'none',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: 0,
    color: 'black',
    padding: '1em',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  },
  primary: { border: '1px solid black' },
  secondary: { backgroundColor: 'grey' },
  cta: { backgroundColor: 'yellow' }
})

Button.category = FormCategory

export default Button
