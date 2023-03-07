/**
 * 改写ELMessage 用于处理页面多次提示，这里只提示一次，第二次的提示会关闭第一次，始终保持页面只提示一次
 */

import type { MessageOptions } from 'element-plus'
import { ElMessage } from 'element-plus' // 引入message弹出框

let messageDom: any = null
const resetMessage = (options: MessageOptions) => {
  if (messageDom)
    messageDom.close() // 判断弹窗是否已存在,若存在则关闭
  if (!options.duration)
    options.duration = 1000

  if (!options.offset)
    options.offset = 90

  messageDom = ElMessage(options)
}
const typeArr = ['success', 'error', 'warning', 'info']
typeArr.forEach((type: string | unknown | undefined) => {
  resetMessage[type] = (options: MessageOptions) => {
    if (typeof options === 'string')
      options = { message: options }
    options.type = type
    return resetMessage(options)
  }
})
export const message: any = resetMessage
