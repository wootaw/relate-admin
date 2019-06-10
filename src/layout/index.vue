<template lang="pug">
  div(class="app-wrapper")
    navbar
    router-view
</template>

<script>
import { Navbar } from './components'

export default {
  name: 'layout',
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
</style>
