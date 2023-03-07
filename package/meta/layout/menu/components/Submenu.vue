<script lang="ts" setup>
defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  routeChildren: {
    type: Object,
    default: () => {},
  },
})

defineOptions({
  name: "Submenu",
})
</script>

<template>
  <el-sub-menu :index="item.name" popper-class="submenu-class">
    <template #title>
      <i v-if="item.meta.icon" class="iconfont" :class="item.meta.icon" />
      <span class="menu-title">{{ item.meta.title }}</span>
    </template>
    <slot />
  </el-sub-menu>
</template>

<style lang="scss" scoped>
.iconfont {
  margin-right: 7px;
}
</style>