import type { AppRouteRecordRaw } from '/#/route/route'
import { getRouteList } from '~/api/common/login'
import { useRouteWithOut } from '~/store/modules/route'
import { filterTreeNodes } from '~/utils/tools'
import { APP_CONFIG_ID_ } from '~/config/config'

export async function getMenu() {
  return await getRouteList({ appId: APP_CONFIG_ID_ })
}

/**
 * @Description 菜单路由
 * @date 2021-06-16
 * @param {any} role
 * @returns {any}
 */

interface State {
  resourceUrl: string
  name: string
  iconOpen: string
  children: any[]
  resourceParams: string
  id: string
  pid: string
  resourceName: string
  externalLink: boolean
  btns: string[]
  nodeType: number
}

interface roleParma {
  resourceUrl?: string
  name: string
  iconOpen: string
  children: any[]
  resourceParams: string
  pid: string
  resourceName: string
  externalLink: boolean
  btns: string[]
  nodeType: number
}

/**
 * 路由的nodeType，不同的值表示不同意思
 * 1：菜单; 2：按钮; 3：内链; 4：外链; 5：dll;
 */
const nodeType = {
  ROUTE: 1,
  BUTTON: 2,
  INNER_LINK: 3,
  EXTERNAL_LINK: 4,
  DLL: 5,
}

Object.freeze(nodeType)

const roleList: any[] = []

/**
 * @Description 筛选出权限按钮的节点，进行保存
 * @date 2022-08-31
 * @param {any} roles:State[]
 * @returns {any}
 */
const buttonPermissionList: string[] = []

function setPowerBtns(roles: State[]): State[] {
  const btns: string[] = []
  roles.forEach((element) => {
    const isBtns = element.nodeType === nodeType.BUTTON
    const item = {
      ...element,
      btns,
    }
    if (element.children.length)
      setPowerBtns(element.children)

    if (isBtns) {
      item.btns.push(element.resourceName)
      buttonPermissionList.push(element.resourceName)
      roleList.push(item)
    }
  })

  return roleList
}

/**
 * @Description 绑定权限按钮到父节点菜单上
 * @date 2022-08-31
 * @param {any} roles:State[]
 * @param {any} childNode
 * @returns {any}
 */
function setMenu(roles: State[], childNode: State) {
  filterTreeNodes(roles, (node) => {
    if (node.id === childNode.pid)
      node.btns = childNode.btns
  })
}

const setSubmenu = (roles: State[]): AppRouteRecordRaw[] => {
  const list: AppRouteRecordRaw[] = []
  roles.forEach((role: roleParma) => {
    // 是否是外链页面
    const isExternalLink = role.nodeType === nodeType.EXTERNAL_LINK

    const item: AppRouteRecordRaw = {
      name: role.resourceUrl || '',
      meta: {
        title: role.name,
        isPage: null,
        icon: role.iconOpen,
        externalLink: isExternalLink,
        nodeType: role.nodeType,
        powerBtns: role.btns,
      },
      path: '',
      children: undefined,
    }

    if (isExternalLink)
      item.name = `${role.resourceUrl}?${role.resourceParams}`

    // 通过children是否有值判断是页面还是父级路由
    if (role.children?.length)
      item.children = setSubmenu(role.children)
    else
      item.meta.isPage = item.meta.nodeType !== 2

    const resourceParams = role.resourceParams
      ? role.resourceParams.split(',')
      : []

    resourceParams?.forEach((param) => {
      item.meta[param] = true
    })

    item.path = role.resourceUrl || ''
    // item.path = `/${role.resourceUrl}`

    if (item.meta.isPage !== false)
      list.push(item)
  })
  return list
}

export const setRoles = (roles: State[]) => {
  const routeStore = useRouteWithOut()
  routeStore.setButtonPermissionList(buttonPermissionList)
  const oldRoles = roles
  const newRoles = setPowerBtns(roles)

  newRoles.forEach((element) => {
    setMenu(oldRoles, element)
  })

  return setSubmenu(oldRoles)
}
