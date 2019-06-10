<template lang="pug">
  div(class="app-navbar")
    div(class="ra-logo")
    ul(class="ra-main-menu")
      router-link(tag="li" :to="{ name: item.name }" :key="item.path" v-for="item of items")
        a
          el-tooltip(
            effect="dark"
            placement="right"
            :open-delay="800"
            :content="item.title"
          )
            i(:class="item.icon")
      li(class="active-tab")
        a
          i(:class="active.icon")
</template>

<script>

export default {
  data () {
    return {
      items: [{
        title: '首页',
        name: 'dashboard',
        icon: 'el-icon-odometer'
      }, {
        title: '客户',
        name: 'customers',
        icon: 'el-icon-user'
      }, {
        title: '媒体账号',
        name: 'accounts',
        icon: 'el-icon-key'
      }, {
        title: '设置',
        name: 'settings',
        icon: 'el-icon-setting'
      }]
    }
  },

  computed: {
    active () {
      const name = this.$route.path.split('/')[1]
      return this.items.find((item) => item.name === name)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-navbar {
  width: 55px;
  height: 100%;
  float: left;
  background-color: $blue_color_dk;
}
.ra-logo {
  height: 65px;
}
.ra-main-menu {
  list-style: none;
  margin: 0;
  padding-left: 0;
  position: relative;
  li {
    height: 55px;
    padding: 0 6px;
    // margin: 5px 0;
    a {
      color: $grey_color_lter;
      display: block;
      width: 100%;
      height: 100%;
      line-height: 55px;
      text-align: center;
      font-size: 22px;
    }
    &.active-tab {
      position: absolute;
      left: 0;
      right: 0;
      transition: all 0.3s;
      &::before, &::after {
        content: "";
        position: absolute;
        right: 0;
        width: 15px;
        height: 15px;
        background-color: $blue_color_dk;
        z-index: 3;
      }
      &::before {
        top: -15px;
        border-radius: 0 0 15px 0;
      }
      &::after {
        border-radius: 0 15px 0 0;
      }
      a {
        background-color: $grey_color_lt;
        color: $blue_color_dk;
        border-radius: 10px 0 0 10px;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: -15px;
          right: -6px;
          width: 15px;
          height: 85px;
          background-color: $grey_color_lt;
        }
      }
    }
    &.router-link-active {
      @for $i from 1 through 10 {
        &:nth-child(#{$i}) ~ .active-tab {
          top: #{55 * ($i - 1)}px;
        }
      }
    }
  }
}
</style>