/**
 * @Description 创建树形 mock 数据函数
 * @date 2021-12-28
 * @returns {any}
 */
export const useTreeData = () => {
  const getKey = (prefix: string, id: number) => {
    return `${prefix}-${id}`
  }

  const createData = (
    maxDeep: number,
    maxChildren: number,
    minNodesNumber: number,
    deep = 1,
    key = 'node',
  ) => {
    let id = 0
    return new Array(minNodesNumber).fill(deep).map(() => {
      const childrenNumber
        = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        title: nodeKey,
        disabled: false,
        children: childrenNumber
          ? createData(
            maxDeep,
            maxChildren,
            childrenNumber,
            deep + 1,
            nodeKey,
          )
          : undefined,
      }
    })
  }

  return {
    createData,
  }
}
