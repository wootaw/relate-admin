<template lang="pug">
  div(class="app-aside-wrapper m-15")
    h3 设置
    aside-menu(:items="items")
    transition(name="fake")
      user-filter
</template>

<script>
import AsideMenu from '@/layout/components/workspace/AsideMenu'
import UserFilter from './boxes/UserFilter'

export default {
  name: 'settings',

  components: {
    AsideMenu,
    UserFilter
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
      }],
    }
  },

}
</script>
