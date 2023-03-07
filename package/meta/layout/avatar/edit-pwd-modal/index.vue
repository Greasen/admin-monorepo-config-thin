<script lang="ts" setup>
import { ref } from "vue"
import edit from "../../edit-password/index.vue"
import { v4 as uuidv4 } from "uuid"
import { useCrossDom } from "~/hooks/web/useCrossDom"

const visible = ref(false)
const visibleClass = ref(`--dsa-modal-${uuidv4()}`)

function updatePwd() {
  useCrossDom(visibleClass, "close")
  visible.value = false
}

function onOpened() {
  useCrossDom(visibleClass)
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
    title="修改密码"
    :model-value="visible"
    width="25%"
    destroy-on-close
    @close="updatePwd"
    @opened="onOpened"
  >
    <edit @update-pwd="updatePwd" />
  </el-dialog>
</template>

<style scoped></style>
