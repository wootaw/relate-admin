<template lang="pug">
  div(class="app-aside-wrapper m-15")
    h3 客户
    aside-menu(:items="items")
</template>

<script>
import AsideMenu from '@/layout/components/workspace/AsideMenu'

export default {
  name: 'customers',

  components: {
    AsideMenu
  },

  data () {
    return {
      items: []
    }
  },

  mounted () {
    // console.log('--->')
    // [{
    //   title: '线索',
    //   name: 'leads',
    //   icon: 'el-icon-odometer'
    // }, {
    //   title: '签单客户',
    //   name: 'signeds',
    //   icon: 'el-icon-user'
    // }, {
    //   title: '客户公海',
    //   name: 'openeds',
    //   icon: 'el-icon-key'
    // }].forEach((item) => this.items.push(item))
    
    this.items.push({
      title: '线索',
      name: 'leads',
      icon: 'el-icon-odometer'
    })

    this.items.push({
      title: '签单客户',
      name: 'signeds',
      icon: 'el-icon-user'
    })

    this.items.push({
      title: '客户公海',
      name: 'openeds',
      icon: 'el-icon-key'
    })
  }
  
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
</style>
