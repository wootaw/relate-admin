<template lang="pug">
  el-card(class="app-filter-box" shadow="never")
    div(slot="header" class="clearfix")
      h5 过滤
      el-button(
        v-if="has"
        class="fr"
        type="warning"
        size="mini"
        icon="el-icon-refresh-left"
        circle
        @click="onClick"
      )
    slot
</template>

<script>

export default {
  props: {
    has: {
      required: true,
      type: Boolean
    }
  },

  methods: {
    onClick () {
      this.$emit('clear')
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
.app-filter-box {
  .el-card__header {
    background-color: $blue_color;
    background-image: linear-gradient(120deg, $blue_color_dk 0%, $grey_color 100%);
    padding: 10px;
    h5 {
      font-size: 1em;
      margin: 0;
      display: inline;
      color: white;
    }
    button {
      padding: 2px;
    }
  }
  .el-card__body {
    padding: 10px;
    h6 {
      margin: 0 0 10px 0;
    }
  }
}
</style>