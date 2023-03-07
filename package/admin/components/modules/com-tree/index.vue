<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import BigTree from '../com-big-tree/tree.vue'
import { checkBelongToChooseNodeByLevel } from './utils/check-node'
import type { Props, TreeData } from './interface'
import { filterFirstTreeNode, filterTreeNodes, isPinyinMatch } from '~/utils/tools'

const passAll = () => true

export default defineComponent({
  name: 'ComTree',
  components: {
    BigTree,
  },
  props: {
    showFilterSelect: Boolean,
    // 传入下拉框的数组
    selects: {
      type: Array,
      default: () => [],
    },
    // 传入下拉框的配置项
    selectProps: {
      default: () => {
        return {
          value: 'value',
          level: 'level',
          label: 'label',
        }
      },
    },
    // 树loading是否显示
    isTreeLoadingShow: {
      type: Boolean,
      default: false,
    },
    // 是否展示过滤弹框
    showFilterInput: {
      type: Boolean,
      default: false,
    },
    highlightCurrent: {
      type: Boolean,
      default: true,
    },
    // 树配置项
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          level: 'level',
          children: 'children',
        }
      },
    },
    treeLoading: {
      type: Boolean,
      default: false,
    },
    expandOnClickNode: {
      type: Boolean,
      default: false,
    },
    // 除了默认的搜索框之外的过滤函数
    extraFilterFn: {
      type: Function,
      default: passAll,
    },
    showExpand: {
      type: Boolean,
      default: false,
    },
    expand: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['filter', 'update:expand'],
  setup(_props, { emit }) {
    const staticState = {
      // 过滤节流定时器
      filterTimer: null,
      // 过滤标记
      filterNotation: 1,
      // 标记key
      notationKey: '_filterNotation',
    }

    const state = reactive({
      elTree: null,
      treeBoxRef: null,
      filterText: '',
      selectVal: '',
      selectNode: null,
    })

    onMounted(() => {
      if (_props.selects && _props.selects.length) {
        state.selectVal
          = _props.selects[_props.selects.length - 1][_props.selectProps.value]
      }
    })

    const methods = {
      /**
       * @Description 下拉框过滤
       * @date 2022-06-29
       * @returns {any}
       */
      selectFilter() {
        state.selectNode = filterFirstTreeNode(_props.selects, (node) => {
          return node.id === state.selectVal
        })
      },
      /**
       * @Description 选择框值的改变
       * @date 2022-08-23
       * @returns {any}
       */
      changeNode(): any {
        methods.selectFilter()
        methods.triggerFilter()
      },
      /**
       * 让树选中的节点滚动到可视区
       */
      scrollToView() {
        const tree = state.treeBoxRef
        const selectedNode = tree.querySelector('.is-current')

        if (!tree || !selectedNode)
          return

        const {
          offsetHeight: treeHeight,
          scrollTop: treeScrollTop,
          scrollLeft: treeScrollLeft,
        } = tree
        const { offsetTop: nodeTop } = selectedNode

        // 如果节点在视界外，则将其移动到视界内
        if (treeHeight + treeScrollTop <= nodeTop || treeScrollTop > nodeTop)
          tree.scroll(treeScrollLeft, nodeTop - treeHeight / 2)
      },
      /**
       * 用于主动触发过滤
       */
      triggerFilter() {
        // 每次过滤之后，将当前过滤标记+1，为下次过滤服务
        state.elTree.filter(state.filterText)
        staticState.filterNotation++

        emit('filter')
      },
      filterNodeMethod(text: string, data: TreeData, node: any): boolean {
        if (!_props.showFilterSelect) {
          const notationKey = staticState.notationKey
          const notationVal = staticState.filterNotation

          // 如果当前节点的标记等于全局标记
          // 表明当前节点的某一层组件节点符合过滤条件
          // 当前节点直接显示
          if (data[notationKey] === notationVal)
            return true

          // 是否能通过除了默认的搜索框之外的过滤函数
          const isPassExtraFilterFn = ((_props as unknown) as Props).extraFilterFn(
            text,
            data,
          )

          const nodeName = data[((_props as unknown) as Props).props.label]
          const isPassTextFilter = isPinyinMatch(nodeName, text)

          // 如果当前节点通过验证
          // 就将该节点的所有子节点打上通过的标记
          if (isPassExtraFilterFn && isPassTextFilter) {
            filterTreeNodes([data], (node) => {
              node[notationKey] = notationVal
            })
          }

          return isPassExtraFilterFn && isPassTextFilter
        }
        else {
          // 如果什么都没填就直接返回
          // 判断层级是否相同，相同层级下进行搜索
          if (!text)
            return true
          // 如果传入的value和data中的label相同说明是匹配到了
          if (
            state.selectNode[_props.selectProps.level] === data[_props.props.level]
            && (data.title.includes(text) || isPinyinMatch(data.title, text))
          )
            return true

          return checkBelongToChooseNodeByLevel(
            text,
            data,
            node,
            state.selectNode,
            _props.props,
          )
        }
      },
      onTreeNodeDblClick(node) {
        if (node.expanded)
          node.collapse()
        else node.expand()
      },
      onClickExpandArrow() {
        emit('update:expand', !_props.expand)
      },
    }

    watch(
      () => state.filterText,
      () => {
        clearTimeout(staticState.filterTimer)

        staticState.filterTimer = setTimeout(() => {
          methods.triggerFilter()
        }, 1000)
      },
    )

    watch(
      () => state.selectVal,
      () => {
        methods.selectFilter()
      },
    )

    return {
      ...toRefs(state),
      ...methods,
    }
  },
})
</script>

<template>
  <div v-loading="treeLoading" class="cool-tree">
    <div class="filter-input">
      <el-input
        v-if="showFilterInput"
        v-model="filterText"
        placeholder="输入关键词搜索..."
        clearable
        class="input"
      >
        <template v-if="showFilterSelect" #prepend>
          <el-select
            v-model="selectVal"
            class="filter-select"
            placeholder="请选择..."
            @change="changeNode"
          >
            <el-option
              v-for="item in selects"
              :key="item[selectProps.value]"
              :label="item[selectProps.label]"
              :value="item[selectProps.value]"
            />
          </el-select>
        </template>

        <template #append>
          <el-button>
            <i class="iconfont icon-sousuo" @click="triggerFilter" />
          </el-button>
        </template>
      </el-input>

      <i
        v-if="showExpand"
        :class="`expand-icon ${expand ? 'arrow-up-s-line' : 'arrow-down-s-line'}`"
        @click="onClickExpandArrow"
      />
    </div>

    <div ref="treeBoxRef" class="tree-box">
      <big-tree
        v-bind="$attrs"
        ref="elTree"
        :props="props"
        :filter-node-method="filterNodeMethod"
        :class="{ 'has-filter-input': showFilterInput }"
        :highlight-current="highlightCurrent"
        :expand-on-click-node="expandOnClickNode"
        class="tree"
      >
        <template #default="scopeObj">
          <div class="tree-node-wrapper" @dblclick="onTreeNodeDblClick(scopeObj.node)">
            <slot v-bind="scopeObj" name="default">
              <span>{{ scopeObj.data[props.label] }}</span>
            </slot>
          </div>
        </template>
      </big-tree>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cool-tree {
  display: flex;
  flex-direction: column;
  height: 100%;

  .filter-input {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    .input {
      flex-grow: 1;
      width: 0;
    }

    .expand-icon {
      flex-shrink: 0;
      padding: 0 10px;
      cursor: pointer;
      user-select: none;
    }
  }

  .filter-select {
    width: 100px;
  }

  .tree-node-wrapper {
    width: 100%;
  }

  .tree-box {
    position: relative;
    flex-grow: 1;
    height: 1px;
    overflow: auto;
  }

  :deep(.el-tree) {
    height: 100%;
    width: auto;
    .el-tree-node {
      .el-tree-node__content {
        height: 36px;
      }
    }
  }
}
</style>
