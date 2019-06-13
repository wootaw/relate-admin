<template lang="pug">
  div(class="app-departments")
    el-row(class="mb-15 ta-r")
      el-col(:span="24")
        router-link(:to="{ path: 'departments/add' }")
          el-button(
            round
            type="primary"
            size="mini"
            icon="el-icon-plus"
          ) 添加直属部门
    el-card(:body-style="{ padding: '0px' }" shadow="never")
      el-table(
        :data="rows"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      )
        el-table-column(label="排序" type="index")
          template(slot-scope="scope")
            i(class="el-icon-rank handle")
        el-table-column(prop="name" label="部门名称")
        el-table-column(label="操作" fixed="right" width="120" align="center")
          template(slot-scope="scope")
            el-button-group(class="app-buttons-plain")
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="添加子部门")
                el-button(
                  size="mini"
                  icon="el-icon-plus"
                  @click="$router.push({ name: 'departments-add', query: { parentId: scope.row.id } })"
                )
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="编辑")
                el-button(
                  size="mini"
                  type="success"
                  icon="el-icon-edit"
                  @click="$router.push({ name: 'departments-edit', params: { id: scope.row.id }})"
                )
              el-tooltip(effect="dark" :open-delay="800" placement="top" content="删除")
                el-button(
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="confirmDelete(scope.$index, scope.row)"
                )
    //- el-dialog(title="收货地址" :visible="true")
    //- div(class="app-dialog")
    transition(name="dialog")
      router-view
</template>

<script>
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      rows: []
    }
  },

  methods: {
    initTable () {
      this.axios.get('api/departments').then((res) => {
        this.rows = res.data
      })
    },

    initSortable () {
      let el = document.querySelectorAll('.app-departments .el-table__body-wrapper > table > tbody')[0]
      new Sortable(el, {
        handle: '.handle',
        animation: 150
      })
    },

    confirmDelete (idx, row) {
      this.$confirm(`确认删除部门“${row.name}”吗？`, '提示', {
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
    this.initSortable()
  }
}
</script>