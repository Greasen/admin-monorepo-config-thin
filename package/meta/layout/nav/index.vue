<script setup lang="ts">
import {  ref } from 'vue'
import appLogo from '../logo/index.vue'
import appNavMenu from './nav-menu.vue'
import appAvatar from '../avatar/index.vue'
import appSetting from '../app-setting/index.vue'

const setRef = ref<InstanceType<typeof appSetting> | null>(null)

defineOptions({
  name: 'appNav',
})

/**
 * @Description 弹出系统设置弹窗
 * @date 2022-10-26
 * @returns {any}
 */
function showSettingModal() {
  setRef.value?.openModal()
}

</script>

<template>
  <header class="layout-header">
    <div class="row">
      <div class="row-logo">
        <app-logo />
      </div>

      <div class="row-menu">
        <app-nav-menu />
      </div>

      <div class="row-avatar">
        <i class="iconfont icon-peizhi" @click="showSettingModal" />
        <app-avatar />
      </div>
    </div>
    <app-setting ref="setRef" />
  </header>
</template>

<style lang="scss" scoped>
@use '~/styles/function.scss' as *;

$cornerWidth: 3px;

.layout-header {
  display: flex;
  padding: 0 12px;
  width: 100%;
  height: 60px;
  background-color: getCssVar(menu-bg-color);
  align-items: center;
  justify-content: space-between;

  .row {
    position: relative;
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    height: 100%;
    padding-right: 20px;

    .row-logo {
      width: 30%;
    }

    .row-menu {
      flex: 1;
      height: 100%;
    }

    .row-avatar {
      display: flex;
      align-items: center;
      color: var(--el-color-white);

      .iconfont {
        font-size: 16px;
        color: var(--el-color-white);
        cursor: pointer;
      }
    }
  }
}
</style>
