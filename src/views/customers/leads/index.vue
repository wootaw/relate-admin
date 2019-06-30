<template lang="pug">
  div(class="app-users")
    sticky(:height="28" :top="15" :fixed-at="50")
      el-row(class="ta-r")
        el-col(:span="12" class="ph-20")
          el-input(placeholder="请输入内容" size="mini")
            el-button(
              round
              type="primary"
              slot="append"
              icon="el-icon-search"
            )
        el-col(:span="12" class="ph-20")
          router-link(:to="{ path: 'leads/add' }")
            el-button(
              round
              type="primary"
              size="mini"
              icon="el-icon-plus"
            ) 添加线索
    el-card(:body-style="{ padding: '0px' }" shadow="never" class="m-20")
      el-table(
        row-key="id"
        :data="rows"
      )
        el-table-column(label="ID" type="index" prop="id")
        el-table-column(prop="name" label="名称")
        el-table-column(label="来源")
          template(slot-scope="scope")
            el-tag(
              class="mr-5"
              effect="dark"
              size="small"
              :type="['', 'info', 'warning', 'success'][scope.row.source]"
            ) {{scope.row.source_name}}
        el-table-column(prop="industry_name" label="行业")
        el-table-column(prop="level" label="意向程度")
        el-table-column(prop="contact" label="联系人")
        el-table-column(prop="mobile" label="电话")
        el-table-column(label="操作" fixed="right" width="120" align="center")
          template(slot-scope="scope")
            el-button-group(class="app-buttons-plain")
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="编辑")
                el-button(
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="$router.push({ name: 'leads-edit', params: { id: scope.row.id }})"
                )
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="放弃")
                el-button(
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="confirmDelete(scope.$index, scope.row)"
                )
      pagination(
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.limit"
        @pagination="getList"
      )
</template>

<script>
import Pagination from '@/components/pagination'
import Sticky from '@/components/sticky'
import FilterAbility from '@/mixins/FilterAbility'

export default {
  components: {
    Pagination,
    Sticky
  },

  mixins: [FilterAbility],

  data () {
    return {
      rows: [],
      total: 24,
      query: {
        page: 1,
        limit: 20
      }
    }
  },

  watch: {
    async routeQuery (nv, ov) {
      if (nv !== null) {
        const q = this.updateQuery(['source', 'industry', 'level'], nv)
        await this.getList(q)
      }
    }
  },

  methods: {
    queryValues: (q) => [q.source, q.industry, q.level],

    async getList (params = {}) {
      const q = { '_page': this.query.page, '_limit': this.query.limit, ...params }
      const res = await this.axios.get('api/leads', { params: q })
      this.rows = res.data
    },

  },

  async mounted () {
    await this.getList()
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
</style>