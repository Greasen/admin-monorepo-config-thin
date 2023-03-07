<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"
import { useRouteWithOut } from "~/store/modules/route"
import { isExternal } from "~/utils/validate"

const props = defineProps({
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
  name: "MenuItem",
})

const route = useRoute()
const router = useRouter()
const routeStore = useRouteWithOut()

function handleLink() {
  const routePath = props.routeChildren.name
  const target = props.routeChildren.meta.target
  if (target === "_blank") {
    if (isExternal(routePath)) window.open(routePath)
    else if (route.name !== routePath) window.open(routePath.href)
  } else {
    if (isExternal(routePath)) {
      window.location.href = routePath
    } else if (props.routeChildren.meta?.externalLink) {
      routeStore.setExternalLinkUrl(props.routeChildren.name)
      router.push({
        name: "external-link",
      })
    } else if (route.name !== routePath) {
      router.push(props.routeChildren)
      routeStore.setExternalLinkUrl(null)
    }
  }
}
</script>

<template>
  <el-menu-item
    :route="routeChildren"
    :index="routeChildren.name"
    @click.capture="handleLink"
  >
    <i v-if="routeChildren.meta.icon" class="iconfont" :class="routeChildren.meta.icon" />
    <span class="menu-title">{{ routeChildren.meta.title }}</span>
  </el-menu-item>
</template>

<style lang="scss" scoped>
.iconfont {
  margin-right: 7px;
}
</style>
