<template lang="pug">
  el-breadcrumb(class="app-breadcrumb" separator-class="el-icon-arrow-right")
    transition-group(name="breadcrumb")
      el-breadcrumb-item(:to="{ path: '/' }" :key="'home'") 首页
      el-breadcrumb-item(
        v-for="item of $route.matched"
        v-if="item.path.length > 0"
        :to="{ path: item.path }"
        :key="item.name"
      ) {{item.meta.title}}
</template>

<style lang="scss">
.app-breadcrumb {
  display: inline;
  line-height: 50px!important;
}
.breadcrumb-enter-active, .breadcrumb-leave-active {
  transition: all .3s;
}

.breadcrumb-enter, .breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .3s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>