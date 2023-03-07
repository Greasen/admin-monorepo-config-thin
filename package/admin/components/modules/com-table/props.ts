export const exportProps = {
  // 头部自定义
  hasHead: {
    type: Boolean,
    default: true,
  },

  // 头部是否浮动定位
  headAbsolute: {
    type: Boolean,
    default: true,
  },

  // 是否显示分页
  showPage: {
    type: Boolean,
    default: true,
  },
  // 分页每页数据量
  pageSize: {
    type: Number,
    default: 20,
  },
  // 分页当前页
  pageNum: {
    type: Number,
    default: 1,
  },

  // 表格数据
  data: {
    type: Array,
    default: () => [],
  },

  // tableColumns
  tableColumns: {
    type: Array,
    default: () => [],
  },

  // 是否虚拟化
  virtualized: Boolean,

  autoHeight: {
    type: Number,
    default: 800,
  },

  // 每页显示个数选择器的选项设置
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40, 50, 100],
  },

  // 分页总数据量
  pageTotal: {
    type: Number,
    default: 0,
  },

  // 尺寸
  small: {
    type: Boolean,
    default: false,
  },

  // 分页是否使用背景
  background: {
    type: Boolean,
    default: true,
  },

  // 是否禁用分页
  disabled: {
    type: Boolean,
    default: false,
  },

  pagerCount: Number,

  pagerLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },

  // 分页位置 left/center/right
  pageAlign: {
    type: String,
    default: 'right',
  },
}
