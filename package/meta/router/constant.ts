export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

export const LAYOUT = () => import('~/layout/index.vue')

// 当多个工作空间中使用同一个组件库的时候，但是版本不同，需要使用命名空间区分组件库，这个时候当不该使用这个地方的 router-view 该在工作空间内自定义 router-view 使用 ElConfigProvider 进行包裹；
export const CONTAINER = () => import('~/layout/main/index.vue')

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME,
      })
    })
}
