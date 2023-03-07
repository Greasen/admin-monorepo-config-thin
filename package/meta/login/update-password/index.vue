<script lang="ts" setup>
import editForm from '~/layout/edit-password/index.vue'
</script>

<template>
  <div class="update-password-wrap">
    <edit-form />
  </div>
</template>

<style lang="scss" scoped>
.update-password-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 0 40%;
  overflow: hidden;
  // background: linear-gradient(#ccc, var(--el-color-primary));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
