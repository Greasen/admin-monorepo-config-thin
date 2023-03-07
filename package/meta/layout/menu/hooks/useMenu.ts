import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { router } from '~/router'
import { useRouteWithOut } from '~/store/modules/route'
import { filterFirstTreeNode } from '~/utils/tools'
import type { AppRouteRecordRaw } from '/#/route/route'

export function useMenu() {
  const route = useRoute()
  const routeStore = useRouteWithOut()
  const cacheActiveRouteName: Ref = ref({}) // 缓存的各个一级菜单下的选中路由
  const activeFirstRoute = computed(() => routeStore.activeFirstRoute)
  const activeRouteName: Ref = ref('') // 当前选中菜单
  const selectedKeys = computed(() => [activeRouteName.value])
  const openKeys: Ref<string[]> = ref([])
  const isCollapse = computed(() => routeStore.isSideCollapse)

  const routeList = computed(() => routeStore.getRoutes)

  /**
   * @Description 设置二级菜单，用于和一级别菜单显示在不同地方用
   * @date 2022-12-13
   * @param {any} activeFirstRoute
   * @returns {any}
   */
  function setSecondMenu(activeFirstRoute: ComputedRef<AppRouteRecordRaw>) {
    const secondLevelMenuList = computed(() => {
      let result: any
      if (activeFirstRoute.value.children) {
        result = activeFirstRoute.value.children.filter(
          (item) => !item.meta.ignoreMenu,
        )
      }

      return result || []
    })
    return secondLevelMenuList
  }

  const secondLevelMenuList = setSecondMenu(activeFirstRoute)

  /**
   * @Description 设置选中的第一级路由
   * @date 2022-12-13
   * @returns {any}
   */
  function setActiveFirstLevelRoute() {
    let parentRoute: any = filterFirstTreeNode(routeList.value, (item) => {
      return item.name === activeRouteName.value
    })
    // if (parentRoute.name === 'Root') return
    while (parentRoute.parentRoute && parentRoute.parentRoute.name !== 'Root') {
      parentRoute = parentRoute.parentRoute
    }

    routeStore.setActiveFirstRoute(parentRoute)
  }

  /**
   * @Description 根据缓存的一级路由下的activeRouteName设置路由
   * @date 2022-12-13
   * @returns {any}
   */
  function setActiveRouteNameByCache() {
    let name = cacheActiveRouteName.value[activeFirstRoute.value.name]
    if (!name) {
      const firstPageRoute: any
        = filterFirstTreeNode(secondLevelMenuList.value, (menu) => {
          return !menu.children
        }) || {}

      name = firstPageRoute.name
    }
    activeRouteName.value = name
  }

  /**
   * @Description 初始化进入页面
   * @date 2022-07-26
   * @returns {any}
   */
  function initActiveRoute() {
    if (!routeList.value || !routeList.value.length)
      return

    const { name }: { [key: string]: string | any } = route

    const routeInRouteList: any = filterFirstTreeNode(routeList.value, item => {
      return item.name === name
    })

    const firstRouter = filterFirstTreeNode(routeList.value, (item: AppRouteRecordRaw) => {
      return !item.children
    })

    if (routeInRouteList) {
      activeRouteName.value = name
      // 如果初始化进入的是根节点，那跳入到路由第一项
      if (routeInRouteList.name === 'Root') {
        activeRouteName.value = firstRouter.name
      }
      setActiveFirstLevelRoute()
    } else {
      setActiveRouteNameByCache()
    }
  }

  /**
   * @Description 跳转路由
   * @date 2022-12-13
   * @returns {any}
   */
  function pushRoute() {
    const name = activeRouteName.value
    router.push({
      name,
    })
  }


  watch(
    () => routeList.value,
    () => {
      initActiveRoute()
    },
  )

  /**
   * @Description 监听一级路由的变化
   * @date 2022-12-13
   * @param {any} (
   * @returns {any}
   */
  watch(() => activeFirstRoute.value, (val) => {
    const activeRoute: any = filterFirstTreeNode(val.children!, item => {
      return !item.children
    })
    activeRouteName.value = activeRoute.name
  })

  /**
   * 监听路由name 的变化
   */
  watch(activeRouteName, (val: string) => {
    cacheActiveRouteName.value[activeFirstRoute.value.name] = val
    pushRoute()
  })

  watch(
    () => route.fullPath,
    () => {
      activeRouteName.value = route.name
      setActiveFirstLevelRoute()
    },
  )

  /**
   * 初始化设置选中路由项
   */
  onMounted(() => {
    initActiveRoute()
  })

  return {
    selectedKeys,
    openKeys,
    routeList,
    isCollapse,
    secondLevelMenuList,
  }
}
