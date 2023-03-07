<script lang="ts" setup>
import { onMounted } from "vue"
import { params } from "./enmu/parmas"
import { useLogin } from "./hooks"

const {
  state,
  codeImg,
  title,
  engTitle,
  getCodeImgFn,
  searchConfig,
  fresh,
  logIn,
  loginLoading,
} = useLogin()

onMounted(() => {
  for (const key in params) {
    if (Object.hasOwn(params, key)) searchConfig(key)
  }
  getCodeImgFn()
})
</script>

<template>
  <div class="login-box">
    <div class="login">
      <h5 class="logo">{{ title }}</h5>
      <span class="logo-eng">{{ engTitle }}</span>

      <form>
        <div class="login-wrap">
          <div class="login-item">
            <i class="iconfont icon-renyuan" />
            <input
              v-model="state.userName"
              type="text"
              placeholder="请输入用户名"
              @keydown.enter="logIn"
            />
          </div>
          <div class="login-item">
            <i class="iconfont icon-suo" />
            <input
              v-model="state.password"
              type="password"
              placeholder="请输入密码"
              name="password"
              autocomplete="off"
              @keydown.enter="logIn"
            />
          </div>
          <div class="login-item">
            <input
              v-model="state.code"
              type="text"
              placeholder="请输入验证码"
              @keydown.enter="logIn"
            />
            <div class="code">
              <img :src="codeImg" alt="验证码" @click="fresh" />
            </div>
          </div>
          <button
            class="login-btn"
            :class="{ 'is-loading': loginLoading }"
            :disabled="loginLoading"
            @click="logIn"
          >
            <el-icon v-if="loginLoading"><el-icon-loading /></el-icon>
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
