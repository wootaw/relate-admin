<template lang="pug">
  div(class="app-roles")
    el-row(class="mb-15 ta-r")
      el-col(:span="24")
        router-link(:to="{ path: 'roles/add' }")
          el-button(
            round
            type="primary"
            size="mini"
            icon="el-icon-plus"
          ) 添加角色
    el-card(:body-style="{ padding: '0px' }" shadow="never")
      el-table(
        :data="rows"
        row-key="id"
      )
        el-table-column(label="ID" type="index" prop="id")
        el-table-column(prop="name" label="角色名称")
        el-table-column(label="操作" fixed="right" width="120" align="center")
          template(slot-scope="scope")
            el-button-group(class="app-buttons-plain")
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="编辑")
                el-button(
                  size="mini"
                  type="success"
                  icon="el-icon-edit"
                  @click="$router.push({ name: 'roles-edit', params: { id: scope.row.id }})"
                )
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="删除")
                el-button(
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="confirmDelete(scope.$index, scope.row)"
                )
    transition(name="dialog")
      router-view
</template>

<script>
export default {
  data () {
    return {
      rows: []
    }
  },

  methods: {
    initTable () {
      this.axios.get('api/roles').then((res) => {
        this.rows = res.data
      })
    },

    confirmDelete (idx, row) {
      this.$confirm(`确认删除角色“${row.name}”吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },

  mounted () {
    this.initTable()
  }
}
</script>