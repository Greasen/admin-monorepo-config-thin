<script lang="ts" setup>
import type { Ref } from "vue"
import { computed, ref, watch } from "vue"
import type { RouteRecordName } from "vue-router"
import { useRoute } from "vue-router"
import { router } from "~/router"
import { useRouteWithOut } from "~/store/modules/route"
import { filterFirstTreeNode, filterTreeNodes } from "~/utils/tools"
import type { AppRouteRecordRaw } from "/#/route/route"

const useStore = useRouteWithOut()
const route = useRoute()

const list: Ref = ref([])
const tagBodyLeft: Ref = ref(0)
const contextMenuLeft: Ref = ref(0)
const contextMenuTop: Ref = ref(0)
const visible: Ref = ref(false)
const scrollOuter: Ref = ref(null)
const scrollBody: Ref = ref(null)

const menuList = {
  others: "关闭其他",
}

const routeList = computed(() => useStore.routes)

const activeFirstLevelRoute = computed(() => {
  return useStore.activeFirstRoute
})

const renderList = computed(() => {
  const activeSecondLevelRoute = activeFirstLevelRoute.value.children || []
  const validRoutes = filterTreeNodes(activeSecondLevelRoute, (item: any) => {
    return !item.children
  })

  const validRouteNames = validRoutes.map((v) => v.name)

  return list.value.filter((v: { name: any }) => validRouteNames.includes(v.name))
})

watch(
  () => route.fullPath,
  () => {
    updateTagList()
  }
)

watch(
  () => routeList.value,
  () => {
    updateTagList()
    filterAuthorityRoutes()
  }
)

watch(visible, (val) => {
  if (val) document.body.addEventListener("click", closeMenu)
  else document.body.removeEventListener("click", closeMenu)
})

updateTagList()

/**
 * @Description 更新菜单
 * @date 2022-01-20
 * @returns {any}
 */
function updateTagList(): any {
  if (!routeList.value.length) return

  const navRoute: AppRouteRecordRaw = filterFirstTreeNode(routeList.value, (item: any) => {
    return item.name === route.name
  })

  // 非页面路由
  if (!navRoute || navRoute.children) return

  const routeSet = new Set(list.value.map((item: { name: any }) => item.name))

  // 路由已在列表中
  if (routeSet.has(navRoute.name)) return

  list.value.push({
    name: navRoute.name,
    title: navRoute.meta.title,
  })
}

/**
 * @Description 当路由列表变化时，需要剔除没有权限的菜单
 * @date 2022-01-20
 * @returns {any}
 */
function filterAuthorityRoutes(): any {
  if (!routeList.value.length) return

  list.value = list.value.filter((item: { name: any }) => {
    return !!filterFirstTreeNode(routeList.value, (node: any) => {
      return item.name === node.name
    })
  })
}

/**
 * @Description 关闭菜单
 * @date 2022-01-20
 * @param {any} closeRoute
 * @returns {any}
 */
function onCloseRouteTag(closeRoute: { name: RouteRecordName | null | undefined }): any {
  const idx = list.value.findIndex(
    (item: { name: any }) => item.name === closeRoute.name
  )

  list.value.splice(idx, 1)
  if (closeRoute.name === route.name) {
    router.push({
      name: renderList.value[0].name,
    })
  }
}

function onCloseOthers() {
  renderList.value.forEach((v: { name: RouteRecordName | null | undefined }) => {
    if (v.name !== route.name) onCloseRouteTag(v)
  })
}

function onClickRouteTag(route: { name: any }) {
  router.push({
    name: route.name,
  })
}

function handleTagsOption() {
  const currentRoute = list.value.find(
    (item: { name: RouteRecordName | null | undefined }) => item.name === route.name
  )

  list.value = [currentRoute]
}

function setScroll(e: { type: any; wheelDelta: number; detail: any }) {
  const type = e.type
  let delta = 0
  if (type === "DOMMouseScroll" || type === "mousewheel")
    delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40

  handleScroll(delta)
}

function handleScroll(offset: number) {
  const outerWidth = (scrollOuter as any).offsetWidth
  const bodyWidth = (scrollBody as any).offsetWidth
  if (offset > 0) {
    tagBodyLeft.value = Math.min(0, tagBodyLeft.value + offset)
  } else {
    if (outerWidth < bodyWidth) {
      if (tagBodyLeft.value < -(bodyWidth - outerWidth))
        // eslint-disable-next-line no-self-assign
        tagBodyLeft.value = tagBodyLeft.value
      else
        tagBodyLeft.value = Math.max(tagBodyLeft.value + offset, outerWidth - bodyWidth)
    } else {
      tagBodyLeft.value = 0
    }
  }
}

function closeMenu() {
  visible.value = false
}
</script>

<template>
  <div class="tags-nav">
    <div class="close-con">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="关闭其他"
        placement="top-start"
        :show-after="300"
      >
        <div>
          <el-icon class="icon" @click="onCloseOthers">
            <el-icon-circle-close />
          </el-icon>
        </div>
      </el-tooltip>
    </div>
    <ul
      v-show="visible"
      :style="{ left: `${contextMenuLeft}px`, top: `${contextMenuTop}px` }"
      class="contextmenu"
    >
      <li v-for="(item, key) of menuList" :key="key" @click="handleTagsOption">
        {{ item }}
      </li>
    </ul>
    <div class="btn-con left-btn">
      <span @click="handleScroll(240)">
        <el-icon class="icon">
          <el-icon-arrow-left />
        </el-icon>
      </span>
    </div>
    <div class="btn-con right-btn">
      <span type="text" @click="handleScroll(-240)">
        <el-icon class="icon">
          <el-icon-arrow-right />
        </el-icon>
      </span>
    </div>
    <div
      ref="scrollOuter"
      class="scroll-outer"
      @DOMMouseScroll="setScroll"
      @mousewheel="setScroll"
    >
      <div ref="scrollBody" class="scroll-body" :style="{ left: `${tagBodyLeft}px` }">
        <transition-group name="taglist-moving-animation">
          <el-tag
            v-for="(item, index) in renderList"
            :key="`tag-nav-${index}`"
            ref="tagsPageOpened"
            :name="item.name"
            :closable="renderList.length > 1"
            :type="item.name === $route.name ? '' : 'info'"
            class="tag"
            @close="onCloseRouteTag(item)"
            @click="onClickRouteTag(item)"
          >
            {{ item.title }}
          </el-tag>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.tags-nav {
  flex-shrink: 0;
  position: relative;
  height: 40px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;

  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 32px;
    background: #fff;
    z-index: 10;
    cursor: pointer;
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    cursor: pointer;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #f0f0f0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 30px;
    right: 62px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 2px 2px rgba(100, 100, 100, 0.1) inset;
    overflow: hidden;
    .scroll-body {
      height: calc(100% - 1px);
      display: flex;
      align-items: center;
      /* padding: 1px 4px 0; */
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .tag {
        margin: 3px;
        cursor: pointer;
      }
    }
  }
  .contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);
    li {
      margin: 0;
      padding: 5px 15px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}

.icon {
  cursor: pointer;
  color: #000;
}
</style>
