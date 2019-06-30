<template lang="pug">
  filter-box(
    v-if="routeName === 'leads'"
    class="mt-20"
    :has="values.length > 0"
    @clear="onClear"
  )
    h6 来源
    el-radio-group(class="app-filter-source mb-10" v-model="filters.source" size="mini")
      el-radio-button(v-for="item of sourceOptions" :label="item.value") {{item.label}}
    h6 所属行业
    el-cascader(
      class="mb-10"
      v-model="filters.industry"
      size="mini"
      :options="industries"
      :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false }"
    )
    h6 
      span 意向程度
      el-popover(
        placement="top-start"
        width="100"
        trigger="hover"
      )
        div(class="app-help-item app-help-item-level" v-for="item of levelOptions")
          label {{item.label}}
          span {{item.desc}}
        i(class="el-icon-warning tc-o ml-5" slot="reference")
    el-select(v-model="filters.level" size="mini" placeholder="请选择")
      el-option(
        v-for="item in levelOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      )
</template>

<script>
import FilterAbility from './FilterAbility'
import { LeadSources, LeadLevels, getIndustriesTree } from '@/utils/options'

export default {
  mixins: [FilterAbility],

  data () {
    return {
      industries: [],
      sourceOptions: LeadSources,
      levelOptions: LeadLevels,
      filters: {
        source: null,
        industry: null,
        level: null
      }
    }
  },

  watch: {
    values (nv, ov) {
      this.changeRouteQuery('leads')
    }
  },

  async mounted () {
    this.industries = await getIndustriesTree()
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
.app-filter-source {
  .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 12px;
  }
}
.app-help-item-level {
  label {
    width: 30px;
    font-weight: bold;
    display: inline-block;
    color: $blue_color_dker;
  }
  span {
    color: $grey_color_dk;
  }
}
</style>