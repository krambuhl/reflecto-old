import Button from './Button'
export default {
  examples: [{
    title: 'Primary button (default)',
    component: h => <Button>Lorem Ipsum</Button>
  }, {
    title: 'Secondary button',
    component: h => <Button variant="secondary">Lorem Ipsum</Button>
  }, {
    title: 'Call-to-action button',
    component: h => <Button variant="cta" href="#">Lorem Ipsum</Button>
  }]
}
