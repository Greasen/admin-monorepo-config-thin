import { LAYOUT } from '../constant'
import { basic } from './basic'
import type { AppRouteRecordRaw } from '/#/route/route'
import { whiteRouteListWithoutMenu } from '$/routes/white-list'

const modules = import.meta.glob('../../../../package/*/routes/index.ts', { eager: true })

const routeModuleList: AppRouteRecordRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as Record<string, unknown>).default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [...routeModuleList]

/**
 * Root
 */
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: LAYOUT,
  ignoreMenu: true,
  meta: {
    title: 'Root',
  },
  children: [...asyncRoutes, ...basic]
}

/**
 * 登录
 */
export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('~/login/index.vue'),
  ignoreMenu: true,
  meta: {
    title: '登录',
  },
}

/**
 * 修改密码，初始化密码修改
 */
export const UpdatePwd: AppRouteRecordRaw = {
  path: '/change-password',
  name: 'change-password',
  component: () => import('~/login/update-password/index.vue'),
  ignoreMenu: true,
  meta: {
    title: '修改密码',
  },
}

/**
 * 内嵌到外部系统请求加载的一个loading 组件
 */
const ExtLink: AppRouteRecordRaw = {
  path: '/loading',
  name: 'loading',
  component: () => import('~/layout/link-loading/index.vue'),
  meta: { title: 'loading' },
  ignoreMenu: true,
}

/**
 * 个人中心
 */

// Basic routing without permission
// 这里是本地路由集合
export const basicRoutes = [
  RootRoute,
  LoginRoute,
  UpdatePwd,
  ExtLink,
  ...whiteRouteListWithoutMenu
]
