<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { filterItem, getAllParentPath, getMatched } from './hooks'
import { useRouteWithOut } from '~/store/modules/route'
import type { AppRouteModule } from '/#/route/route'

defineOptions({
  name: 'ComBreadcrumb',
})
const store = useRouteWithOut()
const menuList = computed(() => store.getRoutes)

const route = useRoute()
const routes = ref<AppRouteModule[]>([])

function getBreadcrumb() {
  const path = route.path.split('/')
  const parent = getAllParentPath(menuList.value, `/${path[1]}`)

  const filterMenus = menuList.value.filter(
    (item: { path: string }) => item.path === parent[0],
  )
  const matched = getMatched(filterMenus, parent) as any
  if (!matched || matched.length === 0)
    return

  routes.value = filterItem(matched)
}

getBreadcrumb()

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
)
</script>

<template>
  <el-breadcrumb style="margin-bottom: 16px;" separator="/">
    <el-breadcrumb-item v-for="item in routes" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
