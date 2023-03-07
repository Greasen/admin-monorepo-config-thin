import { defineStore } from 'pinia'
import { store } from '../index'
import type { AppRouteRecordRaw } from '/#/route/route'
import type { StateType } from '/#/store/route'

export const userStore = defineStore({
  id: 'app-router',
  state: (): StateType => {
    return {
      routes: [],
      activeFirstRoute: {} as AppRouteRecordRaw,
      // 当前是否显示外部链接以及外部链接的地址
      externalLinkUrl: null,
      buttonPermissionList: [],
      // 二级菜单收起折叠
      isSideCollapse: false
    }
  },

  getters: {
    getRoutes(): any | any[] {
      return this.routes
    },
  },

  actions: {
    /**
     * @Description 左侧菜单收起状态存储
     * @date 2022-12-15
     * @param {any} collapse:boolean
     * @returns {any}
     */
    setCollapse(collapse: boolean): void {
      this.isSideCollapse = collapse
    },

    /**
     * @Description 设置路由，根据不同的用户权限读取不同的路由
     * @date 2022-10-12
     * @param {any} route:Object
     * @returns {any}
     */
    setRoutes(route: AppRouteRecordRaw[]) {
      this.routes = route
      // setAuthCache(ROLES_KEY, JSON.stringify(route))
    },

    /**
     * @Description 设置选中一级路由
     * @date 2022-10-24
     * @param {any} route
     * @returns {any}
     */
    setActiveFirstRoute(route: AppRouteRecordRaw) {
      this.activeFirstRoute = route
    },

    setExternalLinkUrl(url: null) {
      this.externalLinkUrl = url
    },

    // 权限按钮
    setButtonPermissionList(list: any[]) {
      this.buttonPermissionList = list
    },
  },
})

export function useRouteWithOut() {
  return userStore(store)
}
