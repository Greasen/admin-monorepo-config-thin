import { RootRoute } from './meta-routes'
import { IS_EXT_LINK, TOKEN_KEY } from '~/enum/cache'
import { useRouteWithOut } from '~/store/modules/route'
import { getAuthCache } from '~/utils/storage'
import { filterFirstTreeNode } from '~/utils/tools'
import type { AppRouteRecordRaw } from '/#/route/route'
import { router } from '~/router'
import { whiteRouteListWithoutMenu } from '/@/service/routes/white-list'
import { whiteRouteNames } from './meta-routes/basic'

/**
 * 路由重定向
 */

// 白名单
const whiteList = ['/login']

router.beforeEach((to: { fullPath: string; name: any }, _from: any, next: (arg0?: { path?: string; replace?: boolean; name?: any } | undefined) => void) => {

  const routeStore = useRouteWithOut()
  const token = getAuthCache(TOKEN_KEY)
  const routeList = routeStore.routes

  const routes = filterTree(RootRoute.children as AppRouteRecordRaw[])

  if (!token) {
    if (getAuthCache(IS_EXT_LINK)) {
      if (to.name !== 'loading') {
        return next({ name: 'loading', replace: true })
      } else {
        return next()
      }
    } else {
      if (whiteList.includes(to.fullPath)) {
        return next()
      } else {
        return next({ name: 'login', replace: true })
      }
    }
  }

  if (!routeList || !routeList.length)
    return next()


  // 当前路由在白名单中放行
  if(whiteRouteNames.includes(to.name)) {
    return next()
  }

  // 当前路由在路由列表中
  const routeInList = filterFirstTreeNode(routes, (route) => {
    return route.name === to.name
  })

  if (routeInList) {
    return next()
  }

  // 当前路由在包含菜单的白名单路由列表中，放行
  const routeInWhiteListHasMenu = filterFirstTreeNode(whiteRouteListWithoutMenu, (route) => {
    return route.name === to.name
  })

  if (routeInWhiteListHasMenu) {
    return next()
  }

  // 否则去往首页
  const firstRouteInList: any = filterFirstTreeNode(routeList, (route) => {
    return !route.children
  })

  next({
    name: firstRouteInList.name,
  })
})

/**
 * @Description 过滤
 * @date 2022-08-12
 * @param {any} arr:AppRouteRecordRaw[]
 * @returns {any}
 */
function filterTree(arr: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  return arr.map((item) => {
    if (item.children && item.children.length)
      item.children = filterTree(item.children)

    return item
  })
}
