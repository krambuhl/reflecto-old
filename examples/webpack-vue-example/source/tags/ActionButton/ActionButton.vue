<template>
  <button class="root" :class="[variant]"><slot /></button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    variant: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="css" scoped>
  .root {
    appearance: none;
    background-color: white;
    border: none;
    border-radius: 0;
    color: black;
    padding: 1em;

    &:hover {
      background-color: black;
      color: white;
    }
  }

  .primary { border: 1px solid black; },
  .secondary { background-color: grey; },
  .cta { background-color: yellow; }
</style>
