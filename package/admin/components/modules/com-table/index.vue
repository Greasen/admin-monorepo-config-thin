<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, nextTick, ref, watch } from 'vue'
import { ElTable } from 'element-plus'
import { exportProps } from './props'
import { emits } from './emits'

const props: any = defineProps(exportProps)
const emit = defineEmits(emits)
defineOptions({
  name: 'ComTable',
})
const columnsRef = ref(props.tableColumns)

watch(
  () => props.tableColumns,
  (val) => {
    columnsRef.value = val
  },
  { deep: true },
)

const elTableRef = ref<InstanceType<typeof ElTable>>()
const showTable: Ref<boolean> = ref(true)

// 绑定 tablecolumns
const bindTableColumns = computed(() =>
  columnsRef.value.filter((column: any) => !column.hide),
)

const showPageRender = computed(() => props.showPage && props.data.length)

const drawer = ref(false)
const direction: Ref = ref('rtl')

const drawerColumns = [
  {
    prop: 'hide',
    label: '隐藏',
  },
  {
    prop: 'fixed',
    label: '固定',
  },
]

async function selectAll() {
  elTableRef.value?.clearSelection()
  await nextTick()
  elTableRef.value?.toggleAllSelection()
}

/**
   * @Description 表格配置
   * @date 2022-07-06
   * @returns {any}
   */
function configTable() {
  drawer.value = true
}

/**
   * @Description 表格恢复尺寸
   * @date 2022-07-06
   * @returns {any}
   */
function refreshTable() {
  showTable.value = false
  nextTick(() => (showTable.value = true))
}

/**
   * @Description pageSize 改变时触发
   * @date 2022-07-06
   * @param {any} pageSize:number
   * @returns {any}
   */
const onPageSizeChange = (pageSize: number) => {
  emit('pageChange', props.pageNum, pageSize)
}

/**
   * @Description current-change 改变时触发
   * @date 2022-07-06
   * @param {any} pageNum:number
   * @returns {any}
   */
const onPageNumChange = (pageNum: number) => {
  emit('pageChange', pageNum, props.pageSize)
}

/**
   * @Description 无法继承element-plus current-change 方法，方法未 defineExpose
   * @date 2022-08-18
   * @param {any} currentRow
   * @param {any} oldCurrentRow
   * @returns {any}
   */
function handleCurrentChange(currentRow: any, oldCurrentRow: any) {
  emit('currentChange', currentRow, oldCurrentRow)
}

defineExpose({
  selectAll,
  getSelectionRows() {
    return elTableRef.value?.store.states.selection.value
  },
  clearSelection() {
    elTableRef.value?.clearSelection()
  },
  toggleRowSelection(row: any, selected: boolean) {
    elTableRef.value?.toggleRowSelection(row, selected)
  },
})
</script>

<template>
  <div class="com-table">
    <!-- 表格的配置部分 -->
    <el-drawer
      v-model="drawer"
      append-to-body
      title="列显隐"
      :direction="direction"
    >
      <ElTable
        :key="Math.random()"
        :data="columnsRef"
        style="width: 100%"
        size="small"
        border
        show-overflow-tooltip
      >
        <el-table-column
          prop="label"
          label="列名"
          width="100"
          align="center"
        />
        <template
          v-for="item in drawerColumns"
          :key="item.key"
        >
          <el-table-column
            :prop="item.prop"
            align="center"
            :label="item.label"
          >
            <template #default="{ row }">
              <el-checkbox
                v-if="item.prop === 'hide'"
                v-model="row[item.prop]"
              />
              <el-select
                v-else-if="item.prop === 'fixed'"
                v-model="row[item.prop]"
                class="m-2"
                placeholder="不固定"
                size="small"
              >
                <el-option
                  label="不固定"
                  :value="false"
                />
                <el-option
                  label="左"
                  value="left"
                />
                <el-option
                  label="右"
                  value="right"
                />
              </el-select>
            </template>
          </el-table-column>
        </template>
      </ElTable>
    </el-drawer>
    <!-- 头部 -->
    <div
      v-if="hasHead"
      class="com-table-head"
      :class="{ 'head-absolute': headAbsolute }"
    >
      <div class="com-table-head-term">
        <slot name="header" />
      </div>

      <div class="head-icons">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="恢复"
          placement="top-start"
        >
          <div
            class="icon-item"
            @click="refreshTable()"
          >
            <i class="iconfont icon-zhongzhi" />
          </div>
        </el-tooltip>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="配置"
          placement="top-start"
        >
          <div
            class="icon-item"
            @click="configTable()"
          >
            <i class="iconfont icon-shenjiguanli" />
          </div>
        </el-tooltip>
      </div>
    </div>
    <!-- 主体部分 -->
    <div class="table-box">
      <ElTable
        v-if="showTable"
        v-bind="$attrs"
        ref="elTableRef"
        :data="data"
        style="width: 100%"
        height="100%"
        border
        stripe
        @current-change="handleCurrentChange"
      >
        <slot name="index" />
        <slot name="selection" />
        <slot name="expand" />
        <el-table-column
          v-for="(item, index) in bindTableColumns"
          :key="index + item.label + item.prop"
          :align="item.align || 'center'"
          :sortable="item.sortable || false"
          :width="item.width ? `${item.width}` : ''"
          show-overflow-tooltip
          :label="item.label"
          :prop="item.prop"
          :min-width="item.minWidth || '20%'"
          :fixed="item.fixed"
          :resizable="!item.disResizable"
        >
          <template
            v-if="item.slot === 'head'"
            #header
          >
            <slot
              :name="item.slot"
              :row="item"
              :head="true"
            />
          </template>

          <template #default="{ row, column, $index }">
            <slot
              :name="item.slot"
              :row="row"
              :column="column"
              :index="$index"
            >
              <span>
                {{ (row[item.prop] ?? '') === '' ? '--' : row[item.prop] }}
              </span>
            </slot>
          </template>
        </el-table-column>
        <slot name="default" />
      </ElTable>
    </div>
    <!-- 分页 -->
    <div
      v-if="showPageRender"
      class="table-page"
      :style="{ justifyContent: pageAlign }"
    >
      <el-pagination
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :small="small"
        :disabled="disabled"
        :background="background"
        :layout="pagerLayout"
        :total="pageTotal"
        :page-size="pageSize"
        :pager-count="pagerCount"
        @size-change="onPageSizeChange"
        @current-change="onPageNumChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .com-table {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .com-table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // width: 100%;
      margin: 6px 0;

      &.head-absolute {
        position: absolute;
        top: -35px;
        right: 0;
      }
    }

    .table-box:not(.el-table) {
      position: relative;
      flex: 1;
      width: 100%;
      height: 1px;
      overflow: auto;
    }

    .head-icons {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        // border: 1px #999 solid;
        border-radius: 50%;
        cursor: pointer;
        margin: 0 3px;
        background-color: var(--el-table-background-th-color);

        &:hover {
          background-color: rgba(64, 158, 255, 0.25);
        }

        .icon-style {
          color: var(--el-text-color-primary);
        }
      }
    }

    .table-page {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 14px;
      overflow: hidden;
    }
  }
</style>
