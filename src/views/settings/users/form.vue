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
          @click="$router.push({ name: 'users' })"
        ) 取消
    div(class="app-dialog-wrapper")
      el-alert(class="mb-15" title="新员工初始密码为 123456，提醒员工首次登录系统后修改" type="warning" show-icon)
      el-form(:model="form" :rules="rules" ref="form" label-width="100px")
        el-row
          el-col(:span="12")
            el-form-item(label="姓名" prop="name")
              el-input(v-model="form.name" size="small")
          el-col(:span="12")
            el-form-item(label="邮箱" prop="email")
              el-input(v-model="form.email" size="small")
        el-row
          el-col(:span="12")
            el-form-item(label="电话" prop="mobile")
              el-input(v-model="form.mobile" size="small")
          el-col(:span="12")
            el-form-item(label="入职日期" prop="joined")
              el-date-picker(
                v-model="form.joined"
                size="small"
                type="date"
                placeholder="选择日期"
              )
        el-row
          el-col(:span="12")
            el-form-item(label="所属部门" prop="department_id")
              el-cascader(
                v-model="form.department_id"
                size="small"
                :options="departments"
                :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false, checkStrictly: true }"
              )
          el-col(:span="12")
            el-form-item(label="角色" prop="role_ids")
              el-select(v-model="form.role_ids" multiple size="small" placeholder="请选择")
                el-option(
                  v-for="f of roles"
                  :key="f.id"
                  :label="f.name"
                  :value="f.id"
                )
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      roles: [],
      form: {
        id: '',
        name: '',
        joined: '',
        department_id: '',
        role_ids: [],
        email: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        joined: [
          { required: true, message: '请输入入职日期', trigger: 'change' }
        ],
        department_id: [
          { required: true, message: '请设定所属部门', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
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
    async getUserByID (id) {
      const res = await this.axios.get(`api/users/${id}`)
      return res.data
    },

    async getDepartments () {
      const res = await this.axios.get(`api/departments_tree`)
      this.departments = res.data
    },

    async getRoles () {
      const res = await this.axios.get(`api/roles`)
      this.roles = res.data
    }
  },

  async mounted () {
    await this.getDepartments()
    await this.getRoles()

    if (this.params.id !== undefined) {
      this.form = await this.getUserByID(this.params.id)
    } else {
      this.form = {
        id: '',
        name: '',
        joined: '',
        department_id: '',
        role_ids: [],
        email: '',
        mobile: ''
      }
    }
  }
}
</script>