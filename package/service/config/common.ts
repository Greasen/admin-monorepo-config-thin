// 接口请求基础配置
export const API_CONFIG_ = {
  development: {
    baseUrl: '/',
  },
  production: {
    baseUrl: '/',
  },
}

// 开发环境下是否使用权限路由
export const developmentUseAuthorityRoute = false

// 是否开启身份鉴别，（送检用到）
export const usePasswordVerify = false

/**
 * 开发环境下 token
 */
export const developmentToken = ''

// 获取权限菜单需要的 appId
export const APP_ID_ = 'appId'

// 获取配置端权限菜单的 appId
export const APP_CONFIG_ID_ = 'appConfigId'

// cbc 模式下 sm4 加密参数
export const SM_4_CONFIG_IV = '1234567123456'

// mode: 'ecb', // 加密的方式有两种，ecb和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
export const SM_4_CONFIG_MODE = 'ecb'

// 系统主题的list
export const THEMES_TYPES_ = [
  {
    key: 'defaultTheme',
    title: '默认主题',
  },
  {
    key: 'scienceTheme',
    title: '科技主题',
  },
  {
    key: 'navyTheme',
    title: '深蓝主题',
  },
]

// 配置系统的名称，用于跳转到该应用的配置系统
export const CONFIG_SYSTEM_NAME = 'admin-monorepo-config-thin'

// 应用系统的名称，用于跳转到该应用系统
export const CLIENT_SYSTEM_NAME = 'admin-monorepo-thin'
