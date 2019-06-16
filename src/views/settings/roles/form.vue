<template lang="pug">
  div(class="app-dialog")
    el-row(class="app-dialog-buttons ta-r p-10")
      el-col(:span="24")
        el-button(
          round
          type="primary"
          size="mini"
          icon="el-icon-success"
        ) 保存
        el-button(
          round
          type="danger"
          size="mini"
          icon="el-icon-error"
          @click="$router.push({ name: 'roles' })"
        ) 取消
    div(class="app-dialog-wrapper")
      el-form(:model="form" :rules="rules" ref="deptForm" label-width="100px")
        el-row
          el-col(:span="10")
            el-form-item(label="角色名称" prop="name")
              el-input(v-model="form.name" size="small")
          el-col(:span="14")
            el-form-item(label="备注" prop="remark")
              el-input(v-model="form.remark" size="small")
        div
          //- el-row
          //-   el-col
          //-     label(style="width: 100px") 权限
          el-checkbox-group(v-model="actions")
            template(v-for="item of items")
              el-divider(content-position="left") 
                i(:class="[item.icon, 'mr-10', 'txt-blue-dk']")
                span {{item.title}}
              el-row(class="app-resource-row" v-for="res of item.resources")
                el-col(:span="4")
                  el-checkbox(
                    :label="res.name"
                    :indeterminate="res.indeterminate"
                    @change="onResourceAllChange"
                  )
                    h4(class="m-0") {{res.title}}
                el-col(:span="20")
                  el-checkbox(
                    border
                    size="mini"
                    :label="action.id"
                    v-for="action of res.actions"
                    @change="onActionChange"
                  ) {{action.name}}

</template>

<script>
import defaultSettings from '@/settings'

export default {
  data() {
    return {
      items: defaultSettings.mainItems.map((item) => {
        return { ...item, resources: [] }
      }),
      resources: [],
      form: {
        id: '',
        name: '',
        remark: '',
        actions: []
      },
      actions: [],
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    active () {
      return this.$route.path.split('/')[2]
    },

    query () {
      return this.$route.query
    },

    params () {
      return this.$route.params
    }
  },

  methods: {
    async initResources () {
      const res = await this.axios.get(`api/resources`)
      this.resources = res.data
      res.data.map((r) => {
        r.indeterminate = false
        this.items.filter(item => item.name === r.group)[0].resources.push(r)
      })
      if (this.params.id !== undefined) {
        const role = await this.axios.get(`api/roles/${this.params.id}`)
        this.form = role.data
        this.actions = []
        role.data.actions.map((act) => {
          this.actions.push(act)
          this.changeAction(act)
        })
      }
    },

    onResourceAllChange (val, event) {
      const name = event.target.value
      this.resources.some((res) => {
        if (res.name === name) {
          let idx = -1;
          res.actions.map((action) => {
            idx = this.actions.indexOf(action.id)
            if (val && idx < 0) {
              this.actions.push(action.id)
            } else if (!val && idx >= 0) {
              this.actions.splice(idx, 1)
            }
          })
          res.indeterminate = false
          return true
        } else {
          return false
        }
      })
    },

    changeAction (id) {
      this.resources.some((res) => {
        if (res.actions.some((act) => act.id === id)) {
          let count = res.actions.filter((act) => this.actions.indexOf(act.id) >= 0).length
          res.indeterminate = count > 0 && count < res.actions.length
          if (!res.indeterminate) {
            const idx = this.actions.indexOf(res.name)
            if (count === 0 && idx >= 0) {
              this.actions.splice(idx, 1)
            } else if (count === res.actions.length && idx < 0) {
              this.actions.push(res.name)
            }
          }
          return true
        } else {
          return false
        }
      })
    },

    onActionChange (val, event) {
      this.changeAction(parseInt(event.target.value, 10))
    }
  },

  async mounted () {
    await this.initResources()
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-resource-row {
  margin: 0 0 5px 0;
  .el-col {
    &:first-child {
      line-height: 28px;
      padding: 0 0 0 15px;
    }
    &:last-child {
      .el-checkbox {
        margin: 0 5px 0 0;
      }
    }
  }
}
</style>