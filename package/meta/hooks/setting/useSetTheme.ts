import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { getAuthCache } from '~/utils/storage'
import { CONFIG_ENUM_ } from '~/config/config'
import { useThemeswithOut } from '~/store/modules/theme'
import { THEMES_KEY } from '~/enum/cache'

const themeStore = useThemeswithOut()

/**
 * @Description 设置主题
 * @date 2022-03-23
 * @returns {any}
 */
export function useSetTheme(): void {
  const themeType = computed(() => themeStore.themeType)
  setThemeCore(themeType)
}

/**
 * @Description 设置主题
 * @date 2022-10-26
 * @param {any} themeType:ComputedRef<string>
 * @returns {any}
 */
function setThemeCore(themeType: ComputedRef<string>) {
  const THEME_TYPE_ = getAuthCache(THEMES_KEY) || window.SYSTEM_CONFIG_[process.env.NODE_ENV].defaultThemeType
  const type = THEME_TYPE_

  if (!getAuthCache(THEMES_KEY, CONFIG_ENUM_.LOCAL))
    themeStore.setThemes(type)

  document.documentElement.className = themeType.value
}
