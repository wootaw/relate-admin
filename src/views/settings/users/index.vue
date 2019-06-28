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
          router-link(:to="{ path: 'users/add' }")
            el-button(
              round
              type="primary"
              size="mini"
              icon="el-icon-plus"
            ) 添加员工
    el-card(:body-style="{ padding: '0px' }" shadow="never" class="m-20")
      el-table(
        row-key="id"
        :data="rows"
        :row-class-name="suspendedRow"
      )
        el-table-column(label="ID" type="index" prop="id")
        el-table-column(prop="name" label="姓名")
        el-table-column(prop="mobile" label="手机")
        el-table-column(prop="department_name" label="所属部门")
        el-table-column(prop="joined" label="入职日期")
        el-table-column(label="角色")
          template(slot-scope="scope")
            el-tag(class="mr-5" v-for="role of scope.row.roles") {{role}}
        el-table-column(label="操作" fixed="right" width="120" align="center")
          template(slot-scope="scope")
            el-button-group(class="app-buttons-plain")
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="编辑")
                el-button(
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="$router.push({ name: 'users-edit', params: { id: scope.row.id }})"
                )
              el-tooltip(effect="dark" :open-delay="800" placement="top" :content="{ 'inservice': '禁用', 'suspended': '解禁' }[scope.row.state]")
                el-button(
                  size="mini"
                  :type="{ 'inservice': 'danger', 'suspended': 'success' }[scope.row.state]"
                  :icon="{ 'inservice': 'el-icon-lock', 'suspended': 'el-icon-unlock' }[scope.row.state]"
                  @click="toggleState(scope.$index, scope.row)"
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

export default {
  components: {
    Pagination,
    Sticky
  },

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

  computed: {
    routeQuery () {
      const q = this.$route.query
      return q === undefined ? null : [q.state, q.did]
    }
  },

  watch: {
    async routeQuery (nv, ov) {
      const q = { '_page': 1 }
      if (nv !== null) {
        if (nv[0] === undefined) {
          delete q['state']
        } else {
          q['state'] = nv[0]
        }
        if (nv[1] === undefined) {
          delete q['department_id']
        } else {
          q['department_id'] = nv[1]
        }
        await this.getList(q)
      }
    }
  },

  methods: {
    async getList (params = {}) {
      const q = { '_page': this.query.page, '_limit': this.query.limit, ...params }
      const res = await this.axios.get('api/users', { params: q })
      this.rows = res.data
    },

    suspendedRow ({ row, rowIndex }) {
      return row.state === 'suspended' ? 'warning-row' : '';
    },

    toggleState (idx, row) {
      row.state = row.state === 'suspended' ? 'inservice' : 'suspended'
    }
  },

  async mounted () {
    await this.getList()
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.el-table .warning-row {
  background-color: $orange_color_lt;
  color: $orange_color_dk;
}
</style>