<template lang="pug">
  div(class="app-aside-wrapper m-15")
    h3 客户
    aside-menu(:items="items")
    transition(name="fake")
      lead-filter
</template>

<script>
import AsideMenu from '@/layout/components/workspace/AsideMenu'
import LeadFilter from './boxes/LeadFilter'

export default {
  name: 'customers',

  components: {
    AsideMenu,
    LeadFilter
  },

  data () {
    return {
      items: [{
        title: '线索',
        name: 'leads',
        icon: 'el-icon-odometer'
      }, {
        title: '签单客户',
        name: 'signeds',
        icon: 'el-icon-user'
      }, {
        title: '客户公海',
        name: 'openeds',
        icon: 'el-icon-key'
      }],
    }
  },

}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
</style>
