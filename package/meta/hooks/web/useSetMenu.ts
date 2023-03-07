import type { Ref } from 'vue'
import { ref } from 'vue'
import { developmentUseAuthorityRoute } from '~/config/config'
import { basicRoutes, RootRoute } from '~/router/meta-routes'
import { useRouteWithOut } from '~/store/modules/route'
import { useUserWithOut } from '~/store/modules/user'
import { filterFirstTreeNode } from '~/utils/tools'
import { message } from '../setting/useMessage'
import { getMenu, setRoles } from './useReqMenu'
import type { AppRouteRecordRaw } from '/#/route/route'

const useAuthorityRouter: Ref<boolean> = ref(developmentUseAuthorityRoute)

if (process.env.NODE_ENV === 'production') {
  useAuthorityRouter.value = true
}

/**
 * @Description 初始化的时候设置路由菜单
 * @date 2022-07-26
 * @returns {any}
 */
export function useSetMenu() {
  const userStore = useUserWithOut()
  const routeStore = useRouteWithOut()

  /**
   * @Description 初始化
   * @date 2022-07-26
   * @returns {any}
   */
  function initMenu() {
    if (!useAuthorityRouter.value)
      setMenuListAndFirstMenu(generateMenuList(basicRoutes))
    else
      asyncGetRoute()
  }

  /**
   * @Description 请求菜单
   * @date 2022-07-26
   * @returns {any}
   */
  async function asyncGetRoute() {
    const route = await getMenu()
    if (route.data && route.data.length) {
      // 业务路由挂载在 RootRoute.children 中，这里请求的路由也是存放在此处
      RootRoute.children = [...setRoles(route.data)]
      const roles = [RootRoute]
      setMenuListAndFirstMenu(generateMenuList(roles))
    }
    else {
      message.warning('未配置菜单')
      userStore.setClearStorge()
    }
  }

  /**
   * @Description 设置菜单
   * @date 2022-07-26
   * @returns {any}
   */
  function setMenuListAndFirstMenu(routes: AppRouteRecordRaw[]) {
    const root: AppRouteRecordRaw = filterFirstTreeNode(routes, (item) => {
      return item.name === "Root"
    })

    const firstNode = root.children![0] || []

    setActiveFirstLevelRoute(firstNode)
    routeStore.setRoutes(routes)
  }

  /**
   * @Description 生成菜单
   * @date 2022-07-26
   * @param {any} routeList
   * @returns {any}
   */
  function generateMenuList(routeList: AppRouteRecordRaw[], parentRoute?: AppRouteRecordRaw): AppRouteRecordRaw[] {
    return routeList.map((route) => {
      const menu = {
        icon: route.meta.icon || '',
        title: route.meta.title,
        meta: {
          ...route.meta,
        },
        name: route.name,
        ignoreKeepAlive: route.ignoreKeepAlive,
        ignoreMenu: route.ignoreMenu,
        path: route.path,
        parentRoute,
        children: undefined,
      }

      if (route.children && route.children.length)
        menu.children = generateMenuList(route.children, menu) as any

      return menu
    })
  }

  /**
   * @Description 设置选中的第一项
   * @date 2022-07-26
   * @param {any} route
   * @returns {any}
   */
  function setActiveFirstLevelRoute(route: AppRouteRecordRaw) {
    routeStore.setActiveFirstRoute(route)
  }

  return {
    initMenu,
  }
}
