<template lang="pug">
  div(class="app-signeds")
    div(class="app-signeds-list")
      div(class="list-header")
      ul(class="list-wapper")
        li(:class="'source-' + row.source" v-for="row in rows")
          router-link(:to="{ name: 'signeds-detail', params: { id: row.id } }" :key="row.id")
            //- span
            h6 {{row.company}}
            label {{row.signed_at}}
      div(class="list-footer")
    div(class="app-signeds-body" v-if="current !== null && current !== undefined")
      h1(class="ph-20") {{current.company}}
      ul(class="detail-items")
        li
          label 来源
          el-tag(
            class="mr-5"
            effect="dark"
            size="small"
            :type="['', 'primary', 'warning', 'success'][current.source]"
          ) {{current.source_name}}
        li
          label 行业
          span {{current.industry_name}}
        li
          label 签单时间
          span {{current.signed_at}}
      ul(class="list-tabs")
        li(v-for="tab in tabs")
          router-link(:to="{ name: 'signeds-' + tab.name }" :key="tab.name") {{tab.title}}
      div(class="list-tab-wrapper")
        transition(name="fade-main" mode="out-in")
          router-view
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
        limit: 15
      },
      tabs: [{
        name: 'owners',
        title: '商务负责人'
      }, {
        name: 'contacts',
        title: '联系人'
      }, {
        name: 'accounts',
        title: '媒体账号'
      }, {
        name: 'contracts',
        title: '合同'
      }, {
        name: 'imprest',
        title: '备款'
      }, {
        name: 'chargeds',
        title: '充值'
      }, {
        name: 'consumeds',
        title: '消耗'
      }, {
        name: 'invoices',
        title: '发票'
      }],
      current: null
    }
  },

  computed: {
    // active () {
    //   return this.$route.path.split('/')[2]
    // },

    // query () {
    //   return this.$route.query
    // },

    params () {
      return this.$route.params
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
      const res = await this.axios.get('api/signeds', { params: q })
      this.rows = res.data
    },

    async getSignedByID (id) {
      const res = await this.axios.get(`api/signeds/${id}`)
      return res.data
    },
  },

  beforeRouteUpdate (to, from, next) {
    if (to.params.id === undefined) {
      next({ name: 'signeds-detail', params: { id: this.rows[0].id } })
    } else {
      this.current = this.rows.find((row) => row.id == to.params.id)
      next()
    }
  },

  async mounted () {
    await this.getList()
    if (this.current === null) {
      if (this.params.id !== undefined) {
        this.current = await this.getSignedByID(this.params.id)
      } else {
        this.current = this.rows[0]
        this.$router.push({ name: 'signeds-detail', params: { id: this.current.id } })
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-signeds {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
}
.app-signeds-list {
  max-width: 220px;
  min-width: 200px;
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  box-shadow: inset -6px 0 14px -6px rgba(100, 100, 100, 0.3), inset 6px 0 14px -6px rgba(100, 100, 100, 0.1);
  .list-header, .list-footer {
    height: 50px;
  }
  .list-wapper {
    flex: 1;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    li {
      border-bottom: 1px solid $grey_color_lt;
      a {
        display: block;
        // position: relative;
        padding: 8px 10px 8px 20px;
        text-decoration: none;
        &:hover:not(.router-link-active) {
          background-color: $blue_color_lt;
          // background-image: linear-gradient(120deg, $grey_color_lt 0%, $grey_color_lter 100%);
          h6 {
            color: $blue_color_dker;
          }
          label {
            color: $grey_color_lter;
          }
        }
        &.router-link-active {
          background-color: $grey_color_lter;
          h6 {
            color: $blue_color_dker;
          }
          // span {
          //   display: none;
          // }
        }
        // span {
        //   display: inline-block;
        //   position: absolute;
        //   top: 0;
        //   right: 0;
        //   width: 0;
        //   height: 0;
        // }
      }
      &.source-1 h6 {
        // border-left-color: $blue_color;
        // border-bottom: solid 2px $blue_color;
        // border-right: solid 5px $blue_color;
        // border-bottom: solid 5px transparent;
        // border-left: solid 5px transparent;
      }
      &.source-2 h6 {
        // border-left-color: $orange_color_dk;
        // border-bottom: solid 2px $orange_color_dk;
        // border-right: solid 5px $orange_color_dk;
        // border-bottom: solid 5px transparent;
        // border-left: solid 5px transparent;
      }
      &.source-3 h6 {
        // border-left-color: $green_color;
        // border-bottom: solid 2px $green_color;
        // border-right: solid 5px $green_color;
        // border-bottom: solid 5px transparent;
        // border-left: solid 5px transparent;
      }
      
      h6 {
        color: black;
        margin: 0 0 5px 0;
      }
      label {
        font-size: 13px;
        color: $grey_color_dker;
      }
    }
  }
}
.app-signeds-body {
  flex: 1;
  flex-basis: auto;
  .detail-items {
    list-style-type: none;
    padding: 0 0 10px 0;
    margin: 0 20px 15px 20px;
    // border-bottom: 1px solid $grey_color;
    li {
      display: inline-block;
      margin: 0 30px 0 0;
      label {
        display: block;
        color: $grey_color_dker;
        font-size: 0.9em;
        margin: 0 0 5px 0;
      }
      span {
        font-weight: bold;
      }
    }
  }
  .list-tabs {
    list-style-type: none;
    padding: 0 0 0 0;
    margin: 0 20px;
    border-bottom: 2px solid $grey_color;
    li {
      display: inline-block;
      &::after {
        content: "";
        display: inline-block;
        width: 20px;
      }
      a {
        display: inline-block;
        position: relative;
        text-decoration: none;
        // color: $blue_color_dker;
        color: $grey_color_dker;
        line-height: 2em;
        // font-weight: bold;
        font-size: 0.9em;
        transition: all .3s;
        &:hover:not(.router-link-active) {
          color: $blue_color_lt;
        }
        &.router-link-active {
          color: $blue_color;
          // font-size: 1em;
          font-weight: bold;
          &::after {
            transform: scaleX(1);
          }
        }
        &::after {
          content: "";
          width: 100%;
          height: 2px;
          background-color: $blue_color;
          position: absolute;
          left: 0;
          bottom: -2px;
          transition: all .3s;
          transform: scaleX(0);
        }
      }
    }
  }
}
</style>