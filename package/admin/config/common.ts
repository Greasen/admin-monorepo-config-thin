import type { ApiParma } from '/#/api'

interface ConfigParma {
  [key: string]: any
}

export const config: ConfigParma = {
  development: {
    // 导出报告操作间隔时间
    exportIntervalTime: 60000,
  },
  production: {
    // 导出报告操作间隔时间
    exportIntervalTime: 60000,
  },

  // 是否使用维坤三维模型
  isVkModel: false,
}

/**
 * api Configure
 */
export const API_CONFIG_: ApiParma | null = null

