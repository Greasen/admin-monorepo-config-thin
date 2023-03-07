/**
 * 工具，跟业务无关
 * @param key
 * @param value
 * @returns
 */

import { CONFIG_ENUM_ } from '../config/config'

// 设置本地存储
export function setAuthCache(key: string, value: string, type: string = CONFIG_ENUM_.SESSION): void {
  return window[type].setItem(key, value)
}

// 获取本地存储
export function getAuthCache(key: string, type: string = CONFIG_ENUM_.SESSION): string | null {
  return window[type].getItem(key)
}

// 删除本地存储
export function removeAuthCache(key: string, type: string = CONFIG_ENUM_.SESSION): void {
  return window[type].removeItem(key)
}

// 清空本地存储
export function clearAuthCache(type: string = CONFIG_ENUM_.SESSION): void {
  return window[type].clear()
}

