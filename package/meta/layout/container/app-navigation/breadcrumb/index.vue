<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useRouteWithOut } from "~/store/modules/route"

const route = useRoute()
const useStore = useRouteWithOut()

const isSideCollapse = computed(() => useStore.isSideCollapse)
const isFullScreen = ref(false)

const routes = computed(() => route.matched.filter(item => item.name))

const breadcrumbs = computed(() => routes.value.filter(item => item.name !== 'Root'))


onMounted(() => {
  const handler = () => (isFullScreen.value = !isFullScreen.value)

  document.addEventListener("fullscreenchange", handler, false)
  document.addEventListener("mozfullscreenchange", handler, false)
  document.addEventListener("webkitfullscreenchange", handler, false)
  document.addEventListener("msfullscreenchange", handler, false)

  document.addEventListener("keydown", (e) => {
    if (e.key === "F11") {
      e.preventDefault()
      onClickFullScreenButton()
    }
  })
})

/**
 * @Description 展开/折叠菜单
 * @date 2022-01-20
 * @returns {any}
 */
function onCollapseChange(): any {
  useStore.setCollapse(!isSideCollapse.value)
}

/**
 * @Description 全屏
 * @date 2022-01-20
 * @returns {any}
 */
function onClickFullScreenButton(): any {
  const body = document.body
  if (isFullScreen.value) {
    if (document.exitFullscreen) document.exitFullscreen()
  } else {
    if (body.requestFullscreen) body.requestFullscreen()
  }
}
</script>

<template>
  <div class="breadcrumb">
    <div class="breadcrumb-wrap">
      <el-icon class="icon" @click="onCollapseChange">
        <el-icon-expand v-if="isSideCollapse" />
        <el-icon-fold v-else />
      </el-icon>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-tooltip
      class="box-item"
      effect="dark"
      :content="isFullScreen ? '退出全屏' : '全屏'"
      placement="bottom"
      :hide-after="1000"
    >
      <el-icon class="full-screen icon" @click="onClickFullScreenButton">
        <el-icon-close v-if="isFullScreen" />
        <el-icon-full-screen v-else />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin: 12px;
}

.breadcrumb-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.icon {
  margin-right: 24px;
  cursor: pointer;
  color: var(--el-color-primary);
}

.full-screen {
  cursor: pointer;
}

:deep(.el-breadcrumb__inner) {
  color: var(--el-text-color-disabled);
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: var(--el-color-primary-light-5);
}
</style>
