import type { AppRouteModule } from '/#/route/route'
interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

const getConfig = (config: Partial<TreeHelperConfig>) =>
  Object.assign({}, DEFAULT_CONFIG, config)

export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T | T[] | null {
  config = getConfig(config)
  const path: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    }
    else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      path.push(node)
      if (func(node))
        return path
    }
  }
  return null
}

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, n => n.path === path) as AppRouteModule[]
  return (menuList || []).map(item => item.path)
}

export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {},
): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

/**
 * @Description 获取路由上的 matched
 * @date 2022-08-30
 * @param {any} menus:Menu[]
 * @param {any} parent:string[]
 * @returns {any}
 */
export function getMatched(menus: AppRouteModule[], parent: string[]) {
  const metched: AppRouteModule[] = []
  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      metched.push({
        ...item,
        name: item.meta?.title || item.name,
      })
    }
    if (item.children?.length)
      metched.push(...getMatched(item.children, parent))
  })
  return metched
}

/**
 * @Description 拉平过滤特殊路由
 * @date 2022-08-30
 * @param {any} list
 * @returns {any}
 */
export function filterItem(list: AppRouteModule[]) {
  return filter(list, (item) => {
    const { meta, name } = item
    if (!meta)
      return !!name

    const { title } = meta
    if (!title)
      return false

    return true
  })
}
