<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import { getCurrentVersion } from "~/api/common"
import { emitsEnum } from "~/enum/emits"
import { message } from "~/hooks/setting/useMessage"
import emitter from "~/logics/mitt"

const vesion = ref("V2.0.1")
const describe = ref("")
const downloadName = ref("文件未上传，请上传文件")
const filePath = ref("")

async function currentVersion() {
  const { code, data } = await getCurrentVersion()
  if (code === "200") {
    vesion.value = data.versionNum
    describe.value = data.versionSummary
  }
}

/**
 * @Description 点击下载
 * @date 2022-08-17
 * @returns {any}
 */
function downloadfile() {
  if (!filePath.value) {
    message.warning("文件未上传，请上传文件")
    return
  }
  const a = document.createElement("a")
  a.style.display = "none"
  a.href = filePath.value
  a.target = "_blank"
  a.click()
  document.body.removeChild(a)
}

function showHistoryModal() {
  emitter.emit(emitsEnum.showHistoryModal)
}

onMounted(() => {
  currentVersion()
})

onUnmounted(() => {
  emitter.off(emitsEnum.showHistoryModal)
})
</script>

<template>
  <div class="about">
    <div class="about-vesion" style="margin-bottom: 12px">
      <label>当前版本：</label>
      <span>{{ vesion }}</span>
      <el-button type="primary" link class="history-vesion" @click="showHistoryModal">
        历史版本
      </el-button>
    </div>

    <div class="vesion-describe">
      <label>版本描述：</label>
      <div class="describe-text">{{ describe }}</div>
    </div>

    <div class="about-download">
      <label>相关资料下载：</label>
      <a class="introduction-link value" @click="downloadfile">
        {{ downloadName }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/styles/function.scss' as *;
.about {
  label {
    display: inline-block;
    width: 100px;
  }
  .about-vesion {
    color: getCssVar(text-color);

    .history-vesion {
      margin-left: 30px;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vesion-describe {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;

    .describe-text {
      flex: 1;
      max-height: 100px;
      overflow: auto;
    }
  }

  .introduction-link {
    color: getCssVar(text-color);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
