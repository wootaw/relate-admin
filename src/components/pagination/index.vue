<template lang="pug">
  div(class="app-pagination-wrapper")
    el-pagination(
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    )
</template>

<script>
export default {
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [5, 10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },

  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },

    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
@keyframes scale-up-center {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}
.app-pagination-wrapper {
  padding: 10px 5px;
  .el-pagination__total, .el-pagination__sizes, .el-pagination__jump, ul.el-pager {
    background-color: $grey_color_lt;
    border-radius: 14px;
    padding: 0 10px;
    color: $blue_color_dker;
    max-height: 28px;
  }
  .el-pagination__sizes {
    padding: 0;
    input.el-input__inner {
      border: none;
      background-color: transparent;
      color: $blue_color_dker;
    }
    i.el-select__caret {
      color: $blue_color_dker;
    }
  }
  .el-pagination__jump {
    margin-left: 10px;
    input.el-input__inner {
      border: none;
      height: 20px;
    }
  }
  ul.el-pager {
    li {
      background-color: transparent;
      padding: 0;
      min-width: 28px;
      margin: 0;
      &.active {
        background-color: $blue_color;
        color: $grey_color_lter;
        border-radius: 6px;
        box-shadow: 0 0 10px 0px $blue_color_lt;
        animation: scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
      }
    }
  }
  button {
    &.btn-prev, &.btn-next {
      border-radius: 50%;
      width: 28px;
      min-width: 28px;
      padding: 0;
      background-color: $grey_color_lt;
      &:not([disabled]):hover {
        background-color: $blue_color;
        color: $grey_color_lter;
      }
    }
    &.btn-prev {
      margin: 0 5px 0 0;
    }
    &.btn-next {
      margin: 0 0 0 5px;
    }
  }
}
</style>