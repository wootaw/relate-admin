<template lang="pug">
  filter-box(
    v-if="routeName === 'users'"
    class="mt-20"
    :has="values.length > 0"
    @clear="onClear"
  )
    h6 状态
    el-radio-group(class="mb-10" v-model="filters.state" size="mini")
      el-radio-button(label="inservice") 在职
      el-radio-button(label="suspended") 离职
    h6 所属部门
    el-cascader(
      v-model="filters.did"
      size="mini"
      :options="departments"
      :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false, checkStrictly: true }"
    )
</template>

<script>
import FilterAbility from './FilterAbility'

export default {
  mixins: [FilterAbility],

  data () {
    return {
      departments: [],
      filters: {
        did: null,
        state: null
      }
    }
  },

  watch: {
    values (nv, ov) {
      this.changeRouteQuery('users')
    }
  },

  methods: {
    async getDepartments () {
      const res = await this.axios.get(`api/departments_tree`)
      this.departments = res.data
    },
  },

  async mounted () {
    await this.getDepartments()
  }
}
</script>
