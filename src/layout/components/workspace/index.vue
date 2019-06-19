<template lang="pug">
  el-container(class="app-workspace")
    el-aside(class="app-aside" :width="asideWidth + dx + 'px'")
      resizer(@move="onResizerMove" @toggle="onResizerToggle")
      component(:is="sidebar" v-if="sidebar !== null")
    el-container(class="app-page")
      el-header(class="app-header" height="50px")
        header-breadcrumb
      el-main(:class="{ 'app-main': true, 'dialog-open': dialogOpened }")
        transition(name="fade-main" mode="out-in")
          router-view
</template>

<script>
import sidebars from '@/components/sidebar'
import Resizer from '@/components/resizer'
import HeaderBreadcrumb from '../headbar/Breadcrumb'

export default {
  name: 'workspace',

  props: {
    asideExpanded: {
      type: Boolean,
      default: true
    }
  },

  components: {
    ...sidebars,
    Resizer,
    HeaderBreadcrumb
  },

  data () {
    return {
      sidebar: null,
      dx: 0,
      asideWidth: 200
    }
  },

  computed: {
    dialogOpened () {
      return this.$route.matched.length >= 4
    }
  },

  methods: {
    onResizerMove (dx) {
      this.dx = dx
    },

    onResizerToggle (expanded) {
      this.dx = expanded ? 0 : -this.asideWidth
      this.$emit('update:asideExpanded', expanded)
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.sidebar = to.matched[1].path.substr(1)
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-workspace {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 55px;
  right: 0;
}
.app-aside {
  width: 100%;
  background-color: $grey_color_lt;
  position: relative;
  overflow: visible!important;
  z-index: 2;
  transition: all .2s;
}
.app-aside-wrapper {
  h3 {
    text-align: left;
    color: $blue_color_dker;
  }
  overflow: hidden;
}
.app-page {
  // z-index: 1;
}
.app-main {
  background-color: $grey_color_lter;
  // border-top: 1px solid $grey_color_lter;
  position: relative;
  padding: 0!important;
  &.dialog-open {
    overflow: hidden;
  }
}

.fade-main-leave-active, .fade-main-enter-active {
  transition: all .3s;
}

.fade-main-enter {
  opacity: 0;
  transform: translateX(30px);
}

.fade-main-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>