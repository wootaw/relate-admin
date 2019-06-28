<template lang="pug">
  div(class="app-aside-wrapper m-15")
    h3 设置
    aside-menu(:items="items")
    filter-box(
      v-if="routeName === 'users'"
      class="mt-20"
      :has="usersFilters.length > 0"
      @clear="onClear"
    )
      h6 状态
      el-radio-group(class="mb-10" v-model="filters.users.state" size="mini")
        el-radio-button(label="inservice") 在职
        el-radio-button(label="suspended") 离职
      h6 所属部门
      el-cascader(
        v-model="filters.users.did"
        size="small"
        :options="departments"
        :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false, checkStrictly: true }"
      )
</template>

<script>
import AsideMenu from '@/layout/components/workspace/AsideMenu'
import FilterBox from '@/components/filter'

export default {
  name: 'settings',

  components: {
    AsideMenu,
    FilterBox
  },

  data () {
    return {
      departments: [],
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
      filters: {
        users: {
          did: null,
          state: null
        }
      }
    }
  },

  computed: {
    routeName () {
      return this.$route.name
    },

    usersFilters () {
      return [this.filters.users.state, this.filters.users.did].filter(v => v !== null)
    }
  },

  watch: {
    usersFilters (nv, ov) {
      const params = {}
      if (this.filters.users.state !== null) {
        params.state = this.filters.users.state
      }
      if (this.filters.users.did !== null) {
        params.did = this.filters.users.did
      }
      this.$router.replace({ name: 'users', query: params })
    }
  },

  methods: {
    async getDepartments () {
      const res = await this.axios.get(`api/departments_tree`)
      this.departments = res.data
    },

    onClear () {
      switch (this.routeName) {
        case 'users':
          this.filters.users.did = null
          this.filters.users.state = null
      }
    }
  },

  async mounted () {
    await this.getDepartments()
  }
}
</script>