/**
 * 项目配置相关
 */

import { defineStore } from 'pinia'
import { store } from '..'
import { getAuthCache } from '~/utils/storage'
import { PIC_SAVE_PATH_KEY, VIDEO_SAVE_PATH_KEY } from '~/enum/cache'
import { CONFIG_ENUM_ } from '~/config/config'

interface Config {
  [key: string]: string
}

/**
 * 配置文件地址存储
 */
export const configState = defineStore({
  id: 'app-config',
  state: (): Config => ({
    // 视频截图路径
    picSavePath: getAuthCache(PIC_SAVE_PATH_KEY, CONFIG_ENUM_.LOCAL) || "C:/DSA5200/pic",
    // 视频录像路径
    videoSavePath: getAuthCache(VIDEO_SAVE_PATH_KEY, CONFIG_ENUM_.LOCAL) || "C:/DSA5200/video",
    // 站点名称
    stationName: '站点名称'
  }),
  getters: {
    getStationName(): string {
      return this.stationName
    }
  },
  actions: {
    /**
     * @Description 设置站点名称
     * @date 2022-12-12
     * @param {any} name
     * @returns {any}
     */
    setStationName(name: string) {
      this.stationName = name
    },
  },
})

export function useConfigWidthOut(): any {
  return configState(store)
}
