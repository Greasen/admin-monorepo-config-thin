export {
  API_CONFIG_,
  developmentUseAuthorityRoute,
  usePasswordVerify,
  APP_ID_,
  APP_CONFIG_ID_,
  SM_4_CONFIG_IV,
  SM_4_CONFIG_MODE,
  THEMES_TYPES_,
  developmentToken
} from '/@/service/config/common'

/**
 * 项目配置类枚举 CONFIG_ENUM_
 */
export enum CONFIG_ENUM_ {
  SOCKET_NAME = 'delta',
  SESSION = 'sessionStorage',
  LOCAL = 'localStorage',
  LAYOUT_TYPE = 0, // 布局类型： 0: 上下， 1：上下(下分左右，菜单内联)，2：左右
}

// 系统标题配置
export const VITE_STSYTM_TITLE_ = ''
