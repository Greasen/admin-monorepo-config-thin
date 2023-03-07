import { developmentToken } from '~/config/config'
import { IS_EXT_LINK, PROJ_CFG_KEY, TOKEN_KEY } from '~/enum/cache'
import { router } from '~/router'
import { useUserWithOut } from '~/store/modules/user'
import { getAuthCache, setAuthCache } from '~/utils/storage'

const userStore = useUserWithOut()

export function useTokenHooks() {
  if (process.env.NODE_ENV !== 'production')
    initDevToken()
  else
    getOpener()
}

/**
 * @Description 初始化开发环境token
 * @date 2022-02-16
 * @returns {any}
 */
function initDevToken(): any {
  if (userStore.token)
    return

  const token = developmentToken
  userStore.setToken(token)
}

/**
 * @Description opener 进来
 * @date 2022-04-19
 * @returns {any}
 */
function getOpener() {
  if (getAuthCache(TOKEN_KEY))
    return

  if (window.opener?.name) {
    setAuthCache(IS_EXT_LINK, '1')
    const info = JSON.parse(window.opener.name)
    if (info?.token && info?.userInfo) {
      userStore.setToken(info.token)
      userStore.setUserInfo(info.userInfo)
      const title = info.userInfo.title ? info.userInfo.title : document.title
      setAuthCache(PROJ_CFG_KEY, title)
      router.push('/')
    }
  }
}
