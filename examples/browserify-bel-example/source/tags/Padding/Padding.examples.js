import { Padding } from '@tags'

export default [{
  title: 'Normal padding (default)',
  padding: false,
  component:
    Padding({ }, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus culpa officiis similique ipsam aliquam consequuntur delectus, ea nostrum sunt aspernatur officia quia, soluta ad nobis, fugiat iste dolorum ducimus adipisci maxime tempore incidunt sequi! Doloremque quisquam eligendi alias explicabo magnam, commodi facere eveniet sed molestiae reiciendis. Neque, voluptatum ducimus animi.')
}, {
  title: 'Small padding',
  padding: false,
  component:
    Padding({ variant: 'small' }, ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis qui doloremque maiores facere, tempore rerum necessitatibus sequi voluptatum, accusamus tenetur, magnam, pariatur enim. A quos ad, earum, consectetur totam, asperiores deserunt cumque, cupiditate magni qui dolore. Provident corrupti, ut aliquam voluptates. Odit ducimus aliquid voluptatum nostrum quibusdam sequi atque!'])
}, {
  title: 'Large padding',
  padding: false,
  component:
    Padding({ variant: 'large' }, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates illo vitae consequatur voluptate rerum temporibus quasi earum, nobis. Saepe ipsum tenetur aut ut eum ducimus mollitia et non, magni, facilis inventore voluptatem? Fuga maxime iste voluptas ipsa, vel, delectus assumenda accusamus optio, fugit, esse harum inventore sint voluptatem dolorem neque.')
}]
