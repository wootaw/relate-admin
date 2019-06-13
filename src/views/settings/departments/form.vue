<template lang="pug">
  div(class="app-dialog")
    //- sticky(class="app-dialog-buttons" :z-index="10" :sticky-top="50")
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
          @click="$router.push({ name: 'departments' })"
        ) 取消
    div(class="app-dialog-wrapper")
      el-row
        el-col(:span="16" :offset="4")
          el-form(:model="deptForm" :rules="rules" ref="deptForm" label-width="100px")
            el-form-item(label="上级部门" prop="parent_name")
              el-input(v-model="deptForm.parent_name" size="small" :disabled="true")
            el-form-item(label="部门名称" prop="name")
              el-input(v-model="deptForm.name" size="small")
            el-form-item(label="职能" prop="functioning")
              el-select(v-model="deptForm.functioning" size="small")
                el-option(
                  v-for="f of functions"
                  :key="f.value"
                  :label="f.label"
                  :value="f.value"
                )
</template>

<script>
import Sticky from '@/components/sticky'

export default {
  components: {
    Sticky
  },

  data() {
    return {
      functions: [
        { label: '其它', value: 'other' },
        { label: '商务', value: 'business' },
        { label: '运营', value: 'operation' },
        { label: '渠道', value: 'channel' },
        { label: '设计', value: 'design' },
        { label: '财务', value: 'finance' }
      ],
      deptForm: {
        id: '',
        parent_id: '',
        parent_name: '公司直属',
        name: '',
        functioning: 'other'
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        functioning: [
          { required: true, message: '请选择职能', trigger: 'change' }
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
    getDepartmentByID (id) {
      return this.axios.get(`api/departments/${id}`)
    }
  },

  mounted () {
    if (this.query.parentId !== undefined) {
      this.getDepartmentByID(this.query.parentId).then((res) => {
        this.deptForm = {
          id: '',
          name: '',
          functioning: 'other',
          ...{ parent_id: res.data.id, parent_name: res.data.name }
        }
      })
    } if (this.params.id !== undefined) {
      this.getDepartmentByID(this.params.id).then((res) => {
        this.deptForm = {
          parent_id: '',
          parent_name: '公司直属',
          ...res.data
        }
      })
    } else {
      this.deptForm = {
        id: '',
        parent_id: '',
        parent_name: '公司直属',
        name: '',
        functioning: 'other'
      }
    }
  }
}
</script>