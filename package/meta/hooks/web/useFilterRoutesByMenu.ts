import type { AppRouteRecordRaw } from '/#/route/route'

/**
 * @Description 递归过滤路由中不显示在菜单中的项
 * @date 2022-07-26
 * @param {any} arr
 * @returns {any}
 */
export function filterRoute(arr: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  return arr
    .filter((route: AppRouteRecordRaw) => !route.ignoreMenu)
    .map((item) => {
      if (item.children)
        item.children = filterRoute(item.children)

      return item
    })
}
