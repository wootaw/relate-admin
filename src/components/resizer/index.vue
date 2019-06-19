<template lang="pug">
  div(
    :class="['app-resizer', 'resizer-' + mode]"
    @mousedown="onMouseDown"
  )
    button(:class="{ expanded: expanded }" @click="onClick")
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'vertical',
      validator: (value) => /^(horizontal|vertical)$/.test(value)
    },

    direction: {
      type: String,
      default: 'left',
      validator: (value) => /^(top|right|bottom|left)$/.test(value)
    }
  },

  data() {
    return {
      start: null,
      expanded: true,
      latestX: 0
    }
  },

  methods: {
    onMouseDown (evt) {
      document.addEventListener('mouseup', this.onMouseUp)
      document.addEventListener('mousemove', this.onMouseMove)
    },

    onMouseMove (evt) {
      if (this.start === null) {
        this.start = evt.clientX
      }
      const dx = evt.clientX - this.start
      if (dx !== this.latestX) {
        this.latestX = dx
        this.$emit('move', dx)
      }
    },

    onMouseUp () {
      document.removeEventListener('mouseup', this.onMouseUp)
      document.removeEventListener('mousemove', this.onMouseMove)
      this.start = null
    },

    onClick () {
      this.expanded = !this.expanded
      this.$emit('toggle', this.expanded)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.app-resizer {
  // z-index: 1;
  button {
    outline: none;
    position: relative;
    color: transparent;
    cursor: pointer;
    background: none;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    &::before, &::after {
      content: "";
      background-color: $blue_color_lt;
      position: absolute;
      opacity: 0;
      width: 2px;
      height: 8px;
      left: 8px;
      transform: rotate(0deg);
      border-radius: 16px;
      transition: transform 200ms ease-in-out 0s, opacity 300ms ease-in-out 200ms;
    }
  }
  &.resizer-vertical {
    cursor: ew-resize;
    height: 100%;
    position: absolute;
    right: -16px;
    width: 16px;
    top: 0;
    bottom: 0;
    &::before {
      content: "";
      height: 100%;
      left: -1px;
      position: absolute;
      width: 2px;
      transition: background-color 300ms ease-in-out 200ms;
    }
    button {
      top: calc(50% - 18px);
      height: 36px;
      width: 24px;
      left: -1px;
      &::before {
        top: 10px;
        transform-origin: 1px 7px;
      }
      &::after {
        top: 16px;
        transform-origin: 1px 1px;
      }
      &:hover {
        &::before {
          transform: rotate(-40deg);
        }
        &::after {
          transform: rotate(40deg);
        }
      }
      &.expanded {
        &:hover {
          &::before {
            transform: rotate(40deg);
          }
          &::after {
            transform: rotate(-40deg);
          }
        }
      }
    }
  }
  &:hover {
    &::before {
      background-color: $blue_color_lt;
    }
    button {
      &::before, &::after {
        opacity: 1;
      }
    }
  }
}
</style>
