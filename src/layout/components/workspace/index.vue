<template lang="pug">
  el-container(class="app-workspace")
    el-aside(class="app-aside" width="200px")
      component(:is="sidebar" v-if="sidebar !== null")
    el-container
      el-header(class="app-header" height="50px")
        header-breadcrumb
      el-main(class="app-main")
        transition(name="fade-main" mode="out-in")
          router-view
</template>

<script>
import sidebars from '@/components/sidebar'
import HeaderBreadcrumb from '../headbar/Breadcrumb'

export default {
  name: 'workspace',

  components: {
    ...sidebars,
    HeaderBreadcrumb
  },

  data () {
    return {
      sidebar: null
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
  padding: 15px;
  background-color: $grey_color_lt;
  
}
.app-aside-wrapper {
  h3 {
    text-align: left;
    color: $blue_color_dker;
  }
}
.app-main {
  background-color: $grey_color_lter;
  position: relative;
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