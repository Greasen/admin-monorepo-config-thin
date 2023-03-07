<script lang="ts" setup>
import AppBreadcrumb from './breadcrumb/index.vue'
import AppNavigation from './navigation/index.vue'

defineOptions({
  name: "AppNavigation",
})
</script>

<template>
  <div class="app-navigation">
    <app-breadcrumb />
    <app-navigation />
  </div>
</template>

<style lang="scss" scoped>
.app-navigation {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
}
</style>
