<script lang="ts" setup>
import appMenu from "../menu/index.vue"
import appContainer from '../container/index.vue'

defineOptions({
  name: "AppMain",
})
</script>

<template>
  <main class="layout-main">
    <div class="slider-bar">
      <app-menu />
    </div>
    <app-container />
  </main>
</template>

<style lang="scss" scoped>
.layout-main {
  display: flex;
  flex-grow: 1;
  height: 1px;

  .slider-bar {
    height: 100%;
  }
}
</style>
