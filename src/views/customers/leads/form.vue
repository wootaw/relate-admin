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
          @click="$router.push({ name: 'leads' })"
        ) 取消
    div(class="app-dialog-wrapper")
      el-form(:model="form" :rules="rules" ref="form" label-width="100px")
        el-row
          el-col(:span="12")
            el-form-item(label="名称" prop="name")
              el-input(v-model="form.name" size="small")
          el-col(:span="12")
            el-form-item(label="公司名称" prop="company")
              el-input(v-model="form.company" size="small")
        el-row
          el-col(:span="12")
            el-form-item(label="联系人" prop="contact")
              el-input(v-model="form.contact" size="small")
          el-col(:span="12")
            el-form-item(label="电话" prop="mobile")
              el-input(v-model="form.mobile" size="small")
        el-row
          el-col
            el-form-item(label="来源" prop="source")
              el-radio-group(v-model="form.source" size="mini")
                el-radio-button(
                  v-for="item of sourceOptions"
                  :label="item.value"
                ) {{item.label}}
        el-row
          el-col(:span="12")
            el-form-item(label="所属行业" prop="industry")
              el-cascader(
                v-model="form.industry"
                size="small"
                :options="industries"
                :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false }"
              )
          el-col(:span="12")
            el-form-item(label="意向程度" prop="level")
              el-select(v-model="form.level" size="small" placeholder="请选择")
                el-option(
                  v-for="f of levelOptions"
                  :key="f.value"
                  :label="f.label"
                  :value="f.value"
                )
                  span(class="option-label") {{f.label}} &nbsp;&nbsp;&nbsp;&nbsp;
                  span(class="option-desc fr") {{f.desc}}
</template>

<script>
import { LeadSources, LeadLevels, getIndustriesTree } from '@/utils/options'

export default {
  data () {
    return {
      industries: [],
      sourceOptions: LeadSources,
      levelOptions: LeadLevels,
      form: {
        id: '',
        name: '',
        company: '',
        industry: '',
        source: '',
        level: '',
        contact: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
        source: [
          { required: true, message: '请设定来源', trigger: 'change' }
        ],
        level: [
          { required: true, message: '请设定意向程度', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
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
    async getLeadByID (id) {
      const res = await this.axios.get(`api/leads/${id}`)
      return res.data
    },

  },

  async mounted () {
    this.industries = await getIndustriesTree()

    if (this.params.id !== undefined) {
      this.form = await this.getLeadByID(this.params.id)
    } else {
      this.form = {
        id: '',
        name: '',
        company: '',
        industry: '',
        source: '',
        level: '',
        contact: '',
        mobile: ''
      }
    }
  }
}
</script>