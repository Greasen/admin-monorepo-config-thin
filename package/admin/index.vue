<script lang="ts" setup>
// 这里是作为子空间的路由搭载，以及组件库的命名空间配置，这里在打包的时候要注意，因为 vue 打包策略，setup 函数中不能为空；为空导致多组件库的使用溯源问题
// setup 函数为空的时候，打包出来的结构完全不同，导致使用组件库的时候各种溯源找不到头，St(); $I()

// 还是不推荐使用多个版本的组件库同时安装，会导致各种奇奇怪怪的问题
import { provide } from 'vue'
import { pwVerifyResourceName } from './enum/resource-name'
import passwordVerify from '~/hooks/web/usePasswordVerify'

provide('passwordVerify', passwordVerify)
provide('pwVerifyResourceName', pwVerifyResourceName)

defineOptions({
  name: 'admin',
})
</script>

<template>
  <div class="layout-content">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.layout-content {
  position: relative;
  height: 100%;
  background-color: #fff;
}
</style>
