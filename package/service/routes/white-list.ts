import type { AppRouteRecordRaw } from '/#/route/route'

// 已有路由的name的白名单，这个名单中对应的路由不会被router.beforeEach拦截
export const whiteRouteNameList: string[] = ['xxx']

// 与登录页面同级的路由白名单，这个列表中的路由页面不会包含菜单
export const whiteRouteListWithoutMenu: AppRouteRecordRaw[] = [
  {
    name: 'test-white-list',
    path: '/test-white-list',
    component: () => import('$/views/overview/index.vue'),
    meta: {
      title: 'xxx',
      icon: 'xxx',
    },
  },
]
