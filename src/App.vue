<template lang="pug">
  div#app
    router-view
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  box-sizing: border-box;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
