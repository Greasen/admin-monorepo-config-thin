/**
 * 这里枚举颜色变量是给无法直接使用 sass 颜色的组件使用
 * 例如：canvas 绘制图形根据主题切换颜色
 */

import { strMapToObj } from '~/utils/tools'

/**
 * 默认背景
 */
enum defaultTheme {
  'text-color-primary' = '#606266', // 主字体色
  'color-black' = 'black', // 字体黑色
  'color-white' = 'white', // 字体白色
}

/**
 * 暗黑背景
 */
enum darkTheme {
  'text-color-primary' = '#F2F6F9', // 主字体色
  'color-black' = 'black', // 字体黑色
  'color-white' = 'white', // 字体白色
}

/**
 * 科技主题
 */
enum scienceTheme {
  'text-color-primary' = '#F2F6F9', // 主字体色
  'color-black' = 'black', // 字体黑色
  'color-white' = 'white', // 字体白色
}

/**
 * 科技主题
 */
enum navyTheme {
  'text-color-primary' = '#F2F6F9', // 主字体色
  'color-black' = 'black', // 字体黑色
  'color-white' = 'white', // 字体白色
}

const themeMap = (() => {
  const map = new Map()
  map.set('defaultTheme', defaultTheme)
  map.set('darkTheme', darkTheme)
  map.set('scienceTheme', scienceTheme)
  map.set('navyTheme', navyTheme)
  return map
})()

export const themeColorObj = strMapToObj(themeMap)
