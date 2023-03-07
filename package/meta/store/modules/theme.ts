import { defineStore } from 'pinia'
import { store } from '../index'
import { getAuthCache, setAuthCache } from '~/utils/storage'
import { CONFIG_ENUM_ } from '~/config/config'
import { THEMES_KEY } from '~/enum/cache'
import { themeColorObj } from '~/enum/themes'

interface themes {
  [key: string]: string
}

export const userStore = defineStore({
  id: 'app-theme',
  state: (): themes => ({
    type: '',
    color: '',
  }),

  getters: {
    themeType(): string {
      return this.type || getAuthCache(THEMES_KEY, CONFIG_ENUM_.LOCAL) || ''
    },
  },

  actions: {
    /**
     * @Description 全局设置主题存储
     * @date 2021-06-10
     * @param {any} themes:string
     * @returns {any}
     */
    setThemes(themes: string): void {
      this.type = themes
      setAuthCache(THEMES_KEY, this.type, CONFIG_ENUM_.LOCAL)
      this.color = themeColorObj[this.type]['text-color-primary']
    },
  },
})

export function useThemeswithOut() {
  return userStore(store)
}
