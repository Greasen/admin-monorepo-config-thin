import { isPinyinMatch } from '~/utils/tools'

// 判断传入的节点是不是选中节点的子节点
export const checkBelongToChooseNodeByLevel = (
  value: string,
  _data: any,
  node: { level: any; parent: any },
  selectNode: any,
  props: Record<string, any>,
) => {
  const level = node.level
  // 如果传入的节点本身就是一级节点就不用校验了
  if (level === 1)
    return false

  // 先取当前节点的父节点
  let parentData = node.parent
  // 遍历当前节点的父节点
  let index = 0
  while (index < level - 1) {
    // 如果匹配到直接返回
    if (
      selectNode.level === parentData.data[props.level]
      && (parentData.data.title.includes(value)
        || isPinyinMatch(parentData.data.title, value))
    )
      return true

    // 否则的话再往上一层做匹配
    parentData = parentData.parent
    index++
  }
  // 没匹配到返回false
  return false
}
