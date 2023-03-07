import type { AppRouteRecordRaw } from '/#/route/route'

export interface StateType {
  routes: AppRouteRecordRaw[]
  activeFirstRoute: AppRouteRecordRaw
  externalLinkUrl: string | null
  buttonPermissionList: any[]
  isSideCollapse: boolean
}