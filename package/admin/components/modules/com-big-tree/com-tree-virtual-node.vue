<script lang="ts">
import type { ComponentInternalInstance } from 'vue'
import {
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  provide,
  ref,
  watch,
} from 'vue'
import { CaretRight } from '@element-plus/icons-vue'
import NodeContent from './com-tree-node-content.vue'
import { useNodeExpandEventBroadcast } from './model/useNodeExpandEventBroadcast'
import { useDragNodeEmitter } from './model/useDragNode'
import Node from './model/node'
import type { RootTreeType, TreeNodeData } from './tree.type'

export default defineComponent({
  name: 'ComTreeVirtualNode',
  componentName: 'ComTreeVirtualNode',

  components: {
    NodeContent,
  },
  props: {
    source: {
      type: Node,
      default: () => ({}),
    },
    onNodeExpand: Function,
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['nodeExpand'],
  setup(props, ctx) {
    const { broadcastExpanded } = useNodeExpandEventBroadcast(props)
    const tree = inject<RootTreeType>('RootTree')
    const expanded = ref(false)
    const childNodeRendered = ref(false)
    const oldChecked = ref<boolean>(null)
    const oldIndeterminate = ref<boolean>(null)
    const node$ = ref<Nullable<HTMLElement>>(null)
    const { emitter } = useDragNodeEmitter()
    const instance = getCurrentInstance()

    provide('NodeInstance', instance)

    if (props.source.expanded) {
      expanded.value = true
      childNodeRendered.value = true
    }

    const handleSelectChange = (checked: boolean, indeterminate: boolean) => {
      if (oldChecked.value !== checked || oldIndeterminate.value !== indeterminate)
        tree.ctx.emit('check-change', props.source.data, checked, indeterminate)

      oldChecked.value = checked
      oldIndeterminate.value = indeterminate
    }

    const handleContextMenu = (event: Event) => {
      if (tree.instance.vnode.props.onNodeContextmenu) {
        event.stopPropagation()
        event.preventDefault()
      }
      tree.ctx.emit('node-contextmenu', event, props.source.data, props.source, instance)
    }

    const handleExpandIconClick = () => {
      if (props.source.isLeaf)
        return
      if (expanded.value) {
        tree.ctx.emit('node-collapse', props.source.data, props.source, instance)
        props.source.collapse()
      }
      else {
        props.source.expand()
        ctx.emit('nodeExpand', props.source.data, props.source, instance)
        props.onNodeExpand
          && props.onNodeExpand(props.source.data, props.source, instance)
      }
    }

    const handleCheckChange = (_value, ev) => {
      props.source.setChecked(ev.target.checked, !tree.props.checkStrictly)
      nextTick(() => {
        const store = tree.store.value
        tree.ctx.emit('check', props.source.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys(),
        })
      })
    }

    const handleClick = () => {
      const store = tree.store.value
      store.setCurrentNode(props.source)
      tree.ctx.emit(
        'current-change',
        store.currentNode ? store.currentNode.data : null,
        store.currentNode,
      )
      tree.currentNode.value = props.source

      if (tree.props.expandOnClickNode)
        handleExpandIconClick()

      if (tree.props.checkOnClickNode && !props.source.disabled) {
        handleCheckChange(null, {
          target: { checked: !props.source.checked },
        })
      }
      tree.ctx.emit('node-click', props.source.data, props.source, instance)
    }

    const handleChildNodeExpand = (
      nodeData: TreeNodeData,
      node: Node,
      instance: ComponentInternalInstance,
    ) => {
      broadcastExpanded(node)
      tree.ctx.emit('node-expand', nodeData, node, instance)
    }

    watch(
      () => props.source.indeterminate,
      (val) => {
        handleSelectChange(props.source.checked, val)
      },
    )

    watch(
      () => props.source.checked,
      (val) => {
        handleSelectChange(val, props.source.indeterminate)
      },
    )

    watch(
      () => props.source.expanded,
      (val) => {
        nextTick(() => (expanded.value = val))
        if (val)
          childNodeRendered.value = true
      },
    )

    return {
      node$,
      tree,
      expanded,
      childNodeRendered,
      oldChecked,
      oldIndeterminate,
      emitter,
      parent,
      handleClick,
      handleContextMenu,
      handleExpandIconClick,
      handleCheckChange,
      handleChildNodeExpand,
      handleSelectChange,
      CaretRight,
    }
  },
})
</script>

<template>
  <div
    v-show="source.visible"
    ref="node$"
    class="el-tree-node"
    :class="{
      'is-expanded': expanded,
      'is-current': source.isCurrent,
      'is-hidden': !source.visible,
      'is-focusable': !source.disabled,
      'is-checked': !source.disabled && source.checked,
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="source.disabled"
    :aria-checked="source.checked"
    @click.stop="handleClick"
    @contextmenu="handleContextMenu"
  >
    <div
      class="el-tree-node__content"
      :style="{ 'padding-left': `${(source.level - 1) * tree.props.indent}px` }"
    >
      <span
        class="el-tree-node__expand-icon" :class="[
          {
            'is-leaf': source.isLeaf,
            'expanded': !source.isLeaf && expanded,
          },
        ]"
        @click.stop="handleExpandIconClick"
      >
        <el-icon>
          <component :is="tree.props.iconClass || CaretRight" />
        </el-icon>
      </span>
      <el-checkbox
        v-if="showCheckbox"
        :model-value="source.checked"
        :indeterminate="source.indeterminate"
        :disabled="!!source.disabled"
        @click.stop
        @change="handleCheckChange"
      />
      <el-icon v-if="source.loading" class="is-loading">
        <el-icon-loading />
      </el-icon>
      <node-content :node="source" :render-content="renderContent" />
    </div>
  </div>
</template>
