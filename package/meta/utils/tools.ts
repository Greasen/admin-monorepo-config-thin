import { pinyin } from 'pinyin-pro'
import pinyinMatch from 'pinyin-match'

export const toPinyinInitials = (text: string): string => {
  return pinyin(text, { toneType: 'none', type: 'array' })
    .map((item) => {
      return item[0]
    })
    .join('')
}

/**
 * 判断filter是否能被text中某一段模糊匹配
 */
export function isPinyinMatch(
  text: string,
  filter: string,
): boolean | number[] {
  return filter === '' || pinyinMatch.match(text, filter)
}

/**
 * 过滤一个树中第一个符合条件的节点对象
 */
export function filterFirstTreeNode<T>(
  tree: T[],
  filterFn: (node: T) => boolean | void,
  childKey?: string,
): T {
  return (function _f(
    tree: T[],
    filterFn: (node: T) => boolean | void,
    childKey = 'children',
  ) {
    let data: any = null

    for (const item of tree) {
      if (filterFn(item))
        data = item
      else if (item[childKey] && item[childKey].length)
        data = _f(item[childKey], filterFn, childKey)

      if (data)
        break
    }

    return data
  })(tree, filterFn, childKey)
}
/**
 * 过滤出一个树中所有符合条件的节点对象
 */
export function filterTreeNodes<T>(
  tree: T[],
  handleFn: (node: T) => boolean | void,
  childKey?: string,
): T[] {
  return (function _f(
    tree: T[],
    handleFn: (n: T) => boolean | void,
    childKey = 'children',
  ) {
    const dep: T[] = []
    tree.forEach((item: any) => {
      if (handleFn(item))
        dep.push(item)

      if (item[childKey] && item[childKey].length)
        dep.push(..._f(item[childKey], handleFn, childKey))
    })

    return dep
  })(tree, handleFn, childKey)
}

// 将blob文件转换为json
export function blobToObj(data: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(data, 'utf-8')
    reader.onload = function () {
      try {
        if (reader.result)
          resolve(JSON.parse(reader.result as string))
        else
          reject(new Error('result is null'))
      }
      catch (error) {
        reject(error)
      }
    }
  })
}

/**
 * @Description 设置主题
 * @date 2022-03-22
 * @param {any} strMap
 * @returns {any}
 */
export function strMapToObj(strMap: Map<any, any>) {
  const obj = Object.create(null)
  for (const [k, v] of strMap)
    obj[k] = v

  return obj
}

export function parseUrlSearchParams(url: string) {
  // 有的时候，英文的&拼接符会被后台转换成中文格式，经过浏览器之后就被encodeURI了，所以需要先decodeURI再替换成英文符
  const u = decodeURI(url).replace(/＆/g, '&') + '#' // 加 # 是为了确定结束位置
  const searchParamsReg = /(?<=[?&\])([\s\S]+?)(?=[&#/])/g
  const paramReg = /^([\w-$]+)=?([\w\W]*)$/
  const params: Record<string, any> = {}

  let exec: RegExpExecArray | null | any,
      match: string,
      key: string,
      value: string
  
  while ((exec = searchParamsReg.exec(u))) {
    [match] = exec

    if ((exec = paramReg.exec(match))) {
      [match, key, value] = exec
      // 如果参数无值，则处理为boolean的true
      params[key] = value || true
    }
  }

  return params
}