export interface TreeData {
  [key: string]: any
}

export interface Props {
  showFilterInput: boolean
  highlightCurrent: boolean
  props: {
    [key: string]: unknown
    label: string
    children: string
  }
  useBuiltInFilter: boolean
  treeLoading: boolean
  expandOnClickNode: boolean
  extraFilterFn: (t: string, d: TreeData) => boolean
}
