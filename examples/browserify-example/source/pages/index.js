import html from 'bel';
import { Heading, Button } from '@tags'

const Page = () => html`
	<div>
		${Heading({ variant: 'h1' }, 'Hello world!')}
	</div>
`

Page.pageTitle = 'Hello World!'