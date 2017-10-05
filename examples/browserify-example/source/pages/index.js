import html from '@shared/html'
import { Heading } from '@tags'

const Page = () => html()`
  <div>
    ${Heading({ variant: 'h1' }, 'Hello world!')}
  </div>
`

Page.pageTitle = 'Hello World!'
