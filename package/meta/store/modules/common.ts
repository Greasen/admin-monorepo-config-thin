import { defineStore } from 'pinia'
import { store } from '../index'
import { IS_EXT_LINK } from '~/enum/cache'
import { setAuthCache } from '~/utils/storage'
import type { StateParma } from '/#/store/config'
import { useThemeswithOut } from './theme'
import { parseUrlSearchParams } from '~/utils/tools'
import { useUserWithOut } from './user'
import { router } from '~/router'
import { linkageLogin } from '~/api/common'
import type { requestParams } from '/#/api'

export const userStore = defineStore({
  id: 'app-common',
  state: (): StateParma => {
    return {
      // 是否嵌入模式
      isEmbeddedMode: false,
      // 是否隐藏二级菜单
      hideHeader: false,
      // 视觉交叉 document
      crossDomList: [],
      // 裁切菜单列表
      cutDomList: [],
    }
  },

  getters: {

  },

  actions: {
    /**
     * @Description 设置视觉交叉的dom
     * @date 2022-11-14
     * @param {any} dom:Element
     * @returns {any}
     */
    setCrossDom(dom: Element | any, type: string) {
      const exitIdx = this.crossDomList.findIndex((item: { uuid: string }) => dom.uuid === item.uuid)
      // 列表中删除dom
      if (type || exitIdx !== -1) {
        this.crossDomList.splice(exitIdx, 1)
        return
      }

      // 列表中替换和新增dom
      if (exitIdx !== -1) {
        this.crossDomList.splice(exitIdx, 1, dom)
      } else {
        this.crossDomList.push(dom)
      }
    },

    /**
     * @Description 从url上获取token
     */
    useUrlPermissionInfo() {
      const themeStore = useThemeswithOut()
      const userStore = useUserWithOut()
      const params = parseUrlSearchParams(window.location.href)

      if (params.patrolStationToken) {
        setAuthCache(IS_EXT_LINK, '1')
        userStore.setToken(params.patrolStationToken)
        this.isEmbeddedMode = true

        if (params.pageName) {
          router.push({
            name: params.pageName
          })
        }
      } else if (params.param1 && params.param2) { // param1是账号，param2是密码
        setAuthCache(IS_EXT_LINK, '1')
        this.isEmbeddedMode = true
        this.reqGetToken({
          loginCode: params.param1,
          password: params.param2
        }, params.pageName)
      }

      if (params.hideHeader) {
        this.hideHeader = true
      }

      if (params.theme) {
        themeStore.setThemes(params.theme)
      }
    },

    /**
     * @Description 获取临时token
     * @date 2022-11-15
     * @param {any} params
     * @param {any} pageName
     * @returns {any}
     */
    async reqGetToken(params: requestParams, pageName: string) {
      const userStore = useUserWithOut()
      const res = await linkageLogin(params)
      userStore.setToken(res.data)
      if (pageName) {
        router.push({
          name: pageName
        })
      } else {
        router.push('/')
      }
    }
  },
})

export function useCommonWithOut() {
  return userStore(store)
}
