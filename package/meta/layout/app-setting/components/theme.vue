<script lang="ts" setup>
import { ref } from 'vue'
import { CONFIG_ENUM_, THEMES_TYPES_ } from '~/config/config'
import { THEMES_KEY } from '~/enum/cache'
import { useSetTheme } from '~/hooks/setting/useSetTheme'
import { useThemeswithOut } from '~/store/modules/theme'
import { getAuthCache } from '~/utils/storage'

const emit = defineEmits(['confirm'])
const themeStore = useThemeswithOut()
const localTheme = getAuthCache(THEMES_KEY, CONFIG_ENUM_.LOCAL) || ''
const moreTheme = ref(localTheme)
const type = ref(themeStore.themeType)

function changeTheme(val: string) {
  type.value = val
}

function subConfirm(val: string) {
  if (val) {
    themeStore.setThemes(type.value)
    useSetTheme()
  }
  emit('confirm', val)
}
</script>

<template>
  <div class="set-theme">
    <span>主题色：</span>
    <el-radio-group v-model="moreTheme" class="group" @change="changeTheme">
      <el-radio v-for="item in THEMES_TYPES_" :key="item.title" :label="item.key">
        {{ item.title }}
      </el-radio>
    </el-radio-group>
  </div>

  <div class="notice-btns">
    <el-button type="primary" @click="subConfirm('ok')">
      确定
    </el-button>
    <el-button type="primary" plain @click="subConfirm('')">
      取消
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
@use '~/styles/function.scss' as *;
.set-theme {
  > span {
    color: getCssVar(text-color);
  }

  .group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

.notice-btns {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
</style>
