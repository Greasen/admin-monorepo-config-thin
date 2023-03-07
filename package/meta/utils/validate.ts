/**
 * @author
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @Description 密码校验
 * @date 2021-09-28
 * @param {any} _rule:any
 * @param {any} value:string
 * @param {any} callback:(arg0?:Error
 * @returns {any}
 */
export function validatePass(_rule: any, value: string, callback: (arg0?: Error) => void): void {
  if (value === '' || value == null || value === undefined) {
    callback(new Error('请输入密码'))
  }
  else {
    if (value.length > 16 || value.length < 0) {
      callback(new Error('密码长度16个字符'))
    }
    else {
      // 校验中文和 emoji 表情
      const reg = /([\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F])/
      const zhReg = /([\u4E00-\u9FA5])/
      const spaceReg = /^\s*$/
      if (reg.test(value) || zhReg.test(value) || spaceReg.test(value))
        callback(new Error('密码格式不正确'))
      else
        callback()
    }
  }
}
