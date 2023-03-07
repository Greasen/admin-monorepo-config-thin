import type { AppRouteModule } from '/#/route/route'
export const CONTAINER = () => import('/@/admin/index.vue')


const admin: AppRouteModule = {
  path: 'system-manage',
  name: 'system-manage',
  meta: {
    title: '系统管理',
    icon: 'icon-quanxianguanli',
  },
  component: CONTAINER,
  children: []
}

export default admin
