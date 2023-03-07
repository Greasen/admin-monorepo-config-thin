<script lang="ts" setup>
import { ElMessageBox } from "element-plus"
import { onUnmounted, ref } from "vue"
import editPwdModal from "./edit-pwd-modal/index.vue"
import { useUserWithOut } from "~/store/modules/user"
import Pic from "~/assets/img/user/avatar.png"
import { getAuthCache } from "~/utils/storage"
import { PROJ_CFG_KEY, TOKEN_KEY, USER_INFO_KEY } from "~/enum/cache"
import { goLogout } from "~/api/common/login"
import emitter from "~/logics/mitt"
import { useCutDom } from "~/hooks/web/useCrossDom"
import { v4 as uuidv4 } from "uuid"
import { useCrossDom } from "~/hooks/web/useCrossDom"
import { CLIENT_SYSTEM_NAME } from "/@/service/config/common"
import { emitsEnum } from "~/enum/emits"

const store = useUserWithOut()

const editPwdRef = ref<InstanceType<typeof editPwdModal> | null>(null)

const visibleClass = ref<string>(`--dsa-modal-${uuidv4()}`)

defineOptions({
  name: "avatar",
})

const { name, photoUrl } = JSON.parse(getAuthCache(USER_INFO_KEY) as string) || {}

/**
 * @Description 退出登录
 * @date 2022-10-25
 * @returns {any}
 */
function logout() {
  ElMessageBox.confirm("是否退出登录", "", {
    customClass: visibleClass.value,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await goLogout()
      store.setClearStorge()
    })
    .finally(() => {
      useCrossDom(visibleClass, "close")
    })
  setTimeout(() => {
    useCrossDom(visibleClass)
  }, 300)
}

const handleVisible = () => {
  useCutDom(".el-dropdown__popper")
}

const editPwd = () => {
  editPwdRef.value?.openModal()
}

/**
 * @Description 跳到应用系统
 * @date 2022-12-06
 * @returns {any}
 */
function standardPostMessage() {
  const url = `/${CLIENT_SYSTEM_NAME}/index.html`
  const token = getAuthCache(TOKEN_KEY)
  const userInfo = getAuthCache(USER_INFO_KEY)
    ? JSON.parse(getAuthCache(USER_INFO_KEY) as string)
    : {}
  const name = getAuthCache(PROJ_CFG_KEY) ? getAuthCache(PROJ_CFG_KEY) : ""
  console.log(userInfo, name, "userInfo")

  window.name = JSON.stringify({
    token,
    userInfo,
    name,
  })
  window.open(url)
}

/**
 * @Description 下载视频播放插件
 * @date 2022-12-14
 * @returns {any}
 */
function downloadfile() {
  emitter.emit(emitsEnum.downloadVideoPlugin)
}

onUnmounted(() => {
  emitter.off(emitsEnum.logout)
  emitter.off(emitsEnum.downloadVideoPlugin)
})
</script>

<template>
  <el-dropdown trigger="click" @visible-change="handleVisible">
    <span class="avatar">
      <el-avatar :src="photoUrl || Pic" />
      <span>{{ name || "admin" }}</span>
      <el-icon class="icon">
        <el-icon-arrow-down-bold />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="editPwd"> 修改密码 </el-dropdown-item>
        <el-dropdown-item @click="standardPostMessage"> 应用系统 </el-dropdown-item>
        <!-- <el-dropdown-item @click="downloadfile"> 下载视频播放插件 </el-dropdown-item> -->
        <el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <edit-pwd-modal ref="editPwdRef" />
</template>

<style lang="scss" scoped>
@use '~/styles/function.scss' as *;
.avatar {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  color: var(--el-color-white);
  cursor: pointer;

  > span {
    margin-left: 12px;
  }
}
.icon {
  margin-left: 6px;
  vertical-align: middle;
}
</style>
