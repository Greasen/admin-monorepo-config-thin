import { defineStore } from 'pinia'
import { store } from '../index'
import { useRouteWithOut } from './route'
import { TOKEN_KEY, USER_INFO_KEY } from '~/enum/cache'
import { router } from '~/router'
import { clearAuthCache, getAuthCache, setAuthCache } from '~/utils/storage'

import emitter from '~/logics/mitt'
import { emitsEnum } from '~/enum/emits'

export const userStore = defineStore({
  id: 'app-user',
  state: () => {
    return {
      userInfo: getAuthCache(USER_INFO_KEY) ? JSON.parse(getAuthCache(USER_INFO_KEY) as string) : {},
      token: getAuthCache(TOKEN_KEY) || '',
    }
  },

  actions: {
    setToken(token: string) {
      this.token = token
      setAuthCache(TOKEN_KEY, token)
    },

    setUserInfo(info: any) {
      this.userInfo = info
      setAuthCache(USER_INFO_KEY, JSON.stringify(info))
    },

    /**
 * @Description 清空存储
 * @date 2021-06-07
 * @returns {void}
 */
    setClearStorge(): void {
      const routeStore = useRouteWithOut()
      clearAuthCache()
      routeStore.setRoutes([])
      this.token = ''
      // 这里广播了一个退出登录的事件，接收此广播的子空间做相应的业务处理
      emitter.emit(emitsEnum.logout)
      router.push({
        path: '/login',
      })
    },
  },
})

export function useUserWithOut() {
  return userStore(store)
}
