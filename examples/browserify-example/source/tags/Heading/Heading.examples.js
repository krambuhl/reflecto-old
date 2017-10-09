import { Heading } from './Heading'

export default [{
  id: 'heading-1',
  title: 'Level 1 styling (default)',
  component:
    Heading({ variant: 'h1' }, 'Lorem ipsum dolor sit amet, consectetur.')
}, {
  title: 'Level 2 styling',
  component:
    Heading({ variant: 'h2' }, ['Quaerat facilis aliquid aut itaque deserunt velit.'])
}, {
  title: 'Level 3 styling',
  component:
    Heading({ variant: 'h3', className: 'whahat' }, 'Cum ab qui, quia vitae, eveniet voluptate.')
}]
