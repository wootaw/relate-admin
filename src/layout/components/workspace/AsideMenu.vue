<template lang="pug">
  div(class="app-aside-menu")
    transition-group(name="slide-fade" tag="ul")
      router-link(tag="li" :to="{ name: item.name }" :key="item.name" v-for="item of rows")
        a {{item.title}}
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      rows: []
    }
  },

  computed: {
    active () {
      return this.$route.path.split('/')[2]
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.items.forEach((item) => this.rows.push(item))
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-aside-menu {
  text-align: left;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    color: $blue_color_dker;
    li {
      margin: 5px 0;
      height: 36px;
      line-height: 36px;
      background-color: white;
      border-radius: 7px;
      a {
        padding: 0 10px;
        display: block;
        font-size: 14px;
        text-decoration: none;
        // border-radius: 7px;
        color: inherit;
      }
      &:hover {
        background-color: $grey_color;
      }
      &::after {
        content: "";
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 7px;
        transition: all .3s ease;
        transform: scale(0);
        transform-origin: 100% 50%;
      }
      &.router-link-active {
        color: white;
        position: relative;
        &::after {
          z-index: 1;
          position: absolute;
          transform: scale(1);
          background-image: linear-gradient(120deg, $blue_color_lt 0%, $grey_color 100%);
        }
        a {
          position: absolute;
          z-index: 2;
        }
      }

      @for $i from 1 through 10 {
        &:nth-child(#{$i}) {
          transition-delay : 0.05s * ($i - 1);
        }
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all .6s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>