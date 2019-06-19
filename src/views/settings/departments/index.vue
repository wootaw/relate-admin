<template lang="pug">
  div(class="app-departments")
    sticky(:height="28" :top="15" :fixed-at="50")
      el-row(class="mb-15 ta-r")
        el-col(:span="24" class="ph-20")
          router-link(:to="{ path: 'departments/add' }")
            el-button(
              round
              type="primary"
              size="mini"
              icon="el-icon-plus"
            ) 添加直属部门
    el-card(:body-style="{ padding: '0px' }" shadow="never" class="m-20")
      el-table(
        :data="rows"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      )
        el-table-column(label="ID" type="index" prop="id")
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
                  type="primary"
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
    transition(name="dialog")
      router-view
</template>

<script>
import Sortable from 'sortablejs'
import Sticky from '@/components/sticky'

export default {
  components: {
    Sticky
  },

  data () {
    return {
      rows: []
    }
  },

  methods: {
    initTable () {
      this.axios.get('api/departments_tree').then((res) => {
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
      this.$confirm(`确认删除“${row.name}”吗？`, '提示', {
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