import Button from './Button'

export default [{
  title: 'Primary button (default)',
  component:
    Button({ }, 'Lorem Ipsum')
}, {
  title: 'Secondary button',
  component:
    Button({ variant: 'secondary' }, 'Lorem Ipsum')
}, {
  title: 'Call-to-action button',
  component:
    Button({ variant: 'cta', href: '#' }, 'Lorem Ipsum')
}]
