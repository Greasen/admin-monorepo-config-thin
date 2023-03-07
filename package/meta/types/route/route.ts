import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import type { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface metaParma extends RouteMeta {
  icon?: string
  title: string
}

/**
 * ignoreKeepAlive：不缓存路由
 * ignoreMenu：不显示在菜单中的项
 */
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: metaParma
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: any
  fullPath?: string
  ignoreKeepAlive?: boolean
  ignoreMenu?: boolean
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw
