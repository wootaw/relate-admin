<template lang="pug">
  div(class="app-sticky")
    div(class="app-sticky-wrapper" :style="wrapperStyle")
      div(
        class="app-sticky-bk"
        :style="{ height: height + top * 2 + 'px', marginTop: -top + 'px', visibility: visibility }"
      )
      slot
    div(class="app-sticky-placeholder" :style="{ height: height + 'px', marginTop: top + 'px' }")
</template>

<script>

export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    fixedAt: {
      type: Number,
      default: 0
    },
    containerClass: {
      type: String,
      default: 'app-main'
    }
  },

  data() {
    return {
      _containerEl: null,
      active: false,
      wrapperTop: 0
    }
  },

  computed: {
    wrapperStyle () {
      return {
        // position: this.active ? 'fixed' : 'absolute',
        position: this.active ? 'absolute' : 'absolute',
        // top: (this.active ? this.wrapperTop + this.fixedAt : this.top) + 'px'
        top: (this.active ? this.wrapperTop : this.top) + 'px'
      }
    },

    visibility () {
      return this.active ? 'visible' : 'hidden'
    }
  },

  mounted () {
    this._containerEl = document.getElementsByClassName(this.containerClass)[0]
    this._containerEl.addEventListener('scroll', this.handleScroll)
  },

  activated () {
    this.handleScroll()
  },

  destroyed () {
    this._containerEl.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      const offsetTop = this.$el.getBoundingClientRect().top
      const dy = this.fixedAt - offsetTop - this.height

      if (dy > 0) {
        this.wrapperTop = this.fixedAt - offsetTop + this.top * 2 + Math.min(0, dy - this.fixedAt)
        this.active = true
      } else {
        this.active = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-sticky-wrapper {
  position: absolute;
  width: 100%;
  z-index: 5;
}
.app-sticky-bk {
  // background-color: $grey_color_lt;
  background-image: linear-gradient(120deg, $blue_color_lt 0%, $grey_color 100%);
  // background-image: linear-gradient(120deg, $grey_color_lt 0%, $grey_color_lter 100%);
  position: absolute;
  z-index: -1;
  width: 100%;
  box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
  overflow: hidden;
  &::before, &::after {
    content: "";
    position: absolute;
    height: 200px;
  }
  &::before {
    border-radius: 45%;
    top: 50px;
    left: -70px;
    width: 130%;
    background-image: linear-gradient(120deg, $blue_color 0%, $grey_color 100%);
    transform: rotate(10deg);
    z-index: 2;
  }
  &::after {
    border-radius: 47%;
    top: 60px;
    width: 150%;
    background-color: rgba(0, 0, 0, 0.05);
    transform: rotate(10deg);
    z-index: 1;
  }
}
</style>