<template lang="pug">
  div(class="app-aside-wrapper m-15")
    h3 设置
    aside-menu(:items="items")
</template>

<script>
import AsideMenu from '@/layout/components/workspace/AsideMenu'

export default {
  name: 'settings',

  components: {
    AsideMenu
  },

  data () {
    return {
      items: [{
        title: '角色',
        name: 'roles',
        icon: 'el-icon-user'
      }, {
        title: '部门',
        name: 'departments',
        icon: 'el-icon-odometer'
      }, {
        title: '员工',
        name: 'users',
        icon: 'el-icon-key'
      }]
    }
  },

  mounted () {
    // console.log('--->')
    // [{
    //   title: '部门',
    //   name: 'departments',
    //   icon: 'el-icon-odometer'
    // }, {
    //   title: '角色',
    //   name: 'roles',
    //   icon: 'el-icon-user'
    // }, {
    //   title: '用户',
    //   name: 'users',
    //   icon: 'el-icon-key'
    // }].forEach((item) => this.items.push(item))
    
    // this.items.push({
    //   title: '线索',
    //   name: 'leads',
    //   icon: 'el-icon-odometer'
    // })

    // this.items.push({
    //   title: '签单客户',
    //   name: 'signeds',
    //   icon: 'el-icon-user'
    // })

    // this.items.push({
    //   title: '客户公海',
    //   name: 'openeds',
    //   icon: 'el-icon-key'
    // })
  }
}
</script>