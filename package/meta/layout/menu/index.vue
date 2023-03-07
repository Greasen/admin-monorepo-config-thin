<script lang="ts" setup>
import { useMenu } from "./hooks/useMenu"
import myComponent from "./component.vue"
import { useCutDom } from "~/hooks/web/useCrossDom"

const { openKeys, secondLevelMenuList, isCollapse } = useMenu()

defineOptions({
  name: "appMenu",
})

/**
 * @Description 折叠
 * @date 2022-04-27
 * @param {any} _index:string|number
 * @param {any} _indexPath:string[]
 * @returns {any}
 */
function handleClose(_index: string | number, _indexPath: string[]) {
  const newOpenKeys = openKeys.value.filter((k: string) => k !== _index)
  openKeys.value = newOpenKeys
  useCutDom("submenu-class", ".el-popper")
}

/**
 * @Description 展开
 * @date 2022-04-27
 * @param {any} _index:string|number
 * @param {any} _indexPath:string[]
 * @returns {any}
 */
function handleOpen(_index: string | number, _indexPath: string[]) {
  const paths = new Set(_indexPath)
  openKeys.value = [...paths]
  useCutDom("submenu-class", ".el-popper")
}
</script>

<template>
  <el-menu
    class="app-menu"
    router
    :collapse="isCollapse"
    :default-active="$route.name"
    :default-openeds="openKeys"
    :ellipsis="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <my-component
      v-for="route in secondLevelMenuList"
      :key="route.name"
      :index="route.name"
      :item="route"
    />
  </el-menu>
</template>

<style lang="scss" scoped>
.app-menu {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 256px;
    min-height: 400px;
  }
}

:deep(.el-sub-menu__title:hover) {
  background-color: var(--el-color-primary-dark-2) !important;
}
</style>
