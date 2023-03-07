<script lang="ts" setup>
import type { Ref } from "vue"
import { onMounted } from "vue"
import { watch } from "vue"
import { computed, ref } from "vue"
import { useRouteWithOut } from "~/store/modules/route"
import { filterFirstTreeNode } from "~/utils/tools"
import type { AppRouteRecordRaw } from "/#/route/route"

const store = useRouteWithOut()

const activeFirstRoute = computed(() => store.activeFirstRoute)

const menuList = computed<AppRouteRecordRaw[]>(() => store.getRoutes)
const routes: Ref<AppRouteRecordRaw[]> = ref([])

function initRoute() {
  if (!menuList.value || !menuList.value.length) return
  const root = filterFirstTreeNode(menuList.value, (item) => {
    return item.name === "Root"
  })

  routes.value = root.children || []
}

watch(
  () => menuList.value,
  () => {
    initRoute()
  }
)

/**
 * 初始化设置选中路由项
 */
onMounted(() => {
  initRoute()
})

defineOptions({
  name: "appNavMenu",
})

/**
 * @Description 点击一级菜单
 * @date 2022-01-19
 * @param {any} item:AppRouteModule
 * @returns {any}
 */
function onClickFirstLevelMenu(item: AppRouteRecordRaw): any {
  store.setActiveFirstRoute(item)
}
</script>

<template>
  <div class="menu">
    <span
      v-for="item in routes"
      :key="item.name"
      :class="{
        active: item.name === activeFirstRoute.name,
      }"
      @click="onClickFirstLevelMenu(item)"
    >
      {{ item.meta.title }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;

  > span {
    margin: 0 12px;
    color: white;
    cursor: pointer;

    &.active {
      color: #fa0;
    }
  }
}
</style>
