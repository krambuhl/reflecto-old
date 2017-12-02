<template>
  <button class="root" :class="[variant]"><slot /></button>
</template>

<script>
export default {
  name: 'ColorSwatch',
  props: {
    variant: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="css" scoped>
  .root {}
</style>
