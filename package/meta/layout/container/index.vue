<script lang="ts" setup>
import AppNavigation from "./app-navigation/index.vue"

defineOptions({
  name: "AppContainer",
})
</script>

<template>
  <main class="app-container">
    <app-navigation />
    <div class="app-layout-content">
      <router-view />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .app-layout-content {
    width: 100%;
    height: calc(100% - 100px);
    padding: 12px;
    flex: 1;
    background-color: #eee;
  }
}
</style>
