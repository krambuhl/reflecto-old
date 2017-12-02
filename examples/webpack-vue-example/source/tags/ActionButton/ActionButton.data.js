import ActionButton from './ActionButton'
export default {
  examples: [{
    title: 'Primary button (default)',
    component: h => <ActionButton>Lorem Ipsum</ActionButton>
  }, {
    title: 'Secondary button',
    component: h => <ActionButton variant="secondary">Lorem Ipsum</ActionButton>
  }, {
    title: 'Call-to-action button',
    component: h => <ActionButton variant="cta" href="#">Lorem Ipsum</ActionButton>
  }]
}
