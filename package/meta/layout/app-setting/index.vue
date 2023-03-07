<script lang="ts" setup>
import { ref } from "vue"
import setting from "./setting.vue"
import { v4 as uuidv4 } from "uuid"
import { useCrossDom } from "~/hooks/web/useCrossDom"

const visible = ref(false)

const visibleClass = ref(`--dsa-modal-${uuidv4()}`)

function onOpened() {
  useCrossDom(visibleClass)
}

function update() {
  useCrossDom(visibleClass, "close")
  visible.value = false
}

function openModal() {
  visible.value = true
}

defineExpose({
  openModal,
})
</script>

<template>
  <el-dialog
    :class="visibleClass"
    title="系统设置"
    :model-value="visible"
    width="30%"
    destroy-on-close
    @close="update"
    @opened="onOpened"
  >
    <setting @update="update" />
  </el-dialog>
</template>
