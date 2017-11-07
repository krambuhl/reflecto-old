import { User } from './User'

export default [{
  title: 'Normal styling with sign-in button (default)',
  component: User({ className: 'yep', name: 'Pablo Picasso' })
}, {
  title: 'Long name styling with no action',
  component: User({ className: 'yep', name: 'Barnaby Marmaduke Aloysius', hideAction: true })
}]
