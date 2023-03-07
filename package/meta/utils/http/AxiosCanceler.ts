import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'

const pendingMap = new Map<string, Canceler>()
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken
      = config.cancelToken
      || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果没有挂起的当前请求，则添加它
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      // 如果挂起中有当前请求标识符，则需要取消并删除当前请求
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }
}
