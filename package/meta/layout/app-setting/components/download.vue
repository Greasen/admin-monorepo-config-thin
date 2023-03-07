<script lang="ts" setup>
import { reactive } from "vue"
import { CONFIG_ENUM_ } from "~/config/config"
import { PIC_SAVE_PATH_KEY, VIDEO_SAVE_PATH_KEY } from "~/enum/cache"
import { useConfigWidthOut } from "~/store/modules/config"
import { setAuthCache } from "~/utils/storage"

const store = useConfigWidthOut()

const formData = reactive({
  picSavePath: store.picSavePath,
  videoSavePath: store.videoSavePath,
})

defineOptions({
  name: "Download",
})

const emit = defineEmits(["confirm"])

const confirm = (val: string) => {
  emit("confirm", val)

  if (val) {
    store.picSavePath = formData.picSavePath
    setAuthCache(PIC_SAVE_PATH_KEY, store.picSavePath, CONFIG_ENUM_.LOCAL)

    store.videoSavePath = formData.videoSavePath
    setAuthCache(VIDEO_SAVE_PATH_KEY, store.videoSavePath, CONFIG_ENUM_.LOCAL)
  }
}

function onInputPicSavePath(value: string) {
  formData.picSavePath = value
}

function onInputVideoSavePath(value: string) {
  formData.videoSavePath = value
}
</script>

<template>
  <div class="download">
    <el-form ref="formRef" :model="formData">
      <el-form-item label="视频截图路径：" prop="picSavePath" class="form-item">
        <el-input
          :model-value="formData.picSavePath"
          placeholder="请输入视频截图保存路径"
          class="value"
          @input="onInputPicSavePath"
        />
      </el-form-item>

      <el-form-item label="视频录像路径：" prop="videoSavePath" class="form-item">
        <el-input
          :model-value="formData.videoSavePath"
          placeholder="请输入视频录像保存路径"
          class="value"
          @input="onInputVideoSavePath"
        />
      </el-form-item>
    </el-form>

    <div class="notice-btns">
      <el-button type="primary" @click="confirm('ok')"> 提交 </el-button>
      <el-button type="primary" plain @click="confirm('')"> 取消 </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.download {
  display: flex;
  flex-direction: column;

  .download-item {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    margin-bottom: 12px;

    > label {
      margin-bottom: 7px;
    }

    .download-url {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 7px;
      cursor: pointer;
      border: 1px #ccc solid;
      border-radius: 3px;

      > span {
        display: inline-block;
        width: 94%;
        border-right: 1px #ccc solid;
      }
    }
  }

  .notice-btns {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
