<script lang="ts" setup>
import type { FormInstance, UploadFile, UploadInstance } from "element-plus"
import { onMounted, reactive, ref } from "vue"
import { getBaseInfoDetails, personalCenterEdit, uploadWithGroupId } from "~/api/common"
import { message } from "~/hooks/setting/useMessage"

const baseInfoForm = ref({
  id: null, //	integer	必须 id
  deptId: "", //	string	必须 部门id
  employeeId: "", //	string	必须 人员id
  deptName: "", // 所属组织
  name: "", //	string	必须 姓名
  phone: "", //	string	非必须 手机号码
  sex: null, //	integer	必须 性别
  idCard: "", //	string	非必须 身份证号
  address: "", //	string	非必须 现住址
  photoUrl: "", //	string	非必须
  photo: "", //	string	非必须 头像图片
  postionName: "", //	string	非必须 工作岗位
  staffNo: "", //	string	非必须 工号
  email: "", //	string	非必须 邮箱
})

// 表单验证
const ruleValidate = {
  email: [
    { required: false, trigger: "blur" },
    { type: "email", message: "邮箱地址格式不正确", trigger: "blur" },
  ],
}

const headerImg = ref("")
const uploadRef = ref<UploadInstance | null>(null)
const fileList = reactive([])
const showClearIcon = ref<boolean>(false)
const fileName = ref<string>("")
const fileFile = ref<UploadFile | any>()

// 头像文件是否变化过
const isAvatarFileChange = ref(false)
const baseInfoFormRef = ref<FormInstance | null>(null)

async function getDetails(): Promise<void> {
  const res = await getBaseInfoDetails()
  headerImg.value = res.data.photoUrl
  baseInfoForm.value = res.data
}

/**
 * @description 重置
 */
function onReset() {
  getDetails()
}

function leaveImg() {
  showClearIcon.value = false
}
function enterImg() {
  showClearIcon.value = true
}
function clearHeader() {
  headerImg.value = ""
  baseInfoForm.value.photoUrl = ""
  baseInfoForm.value.photo = ""
}

function changeFile(file: UploadFile | any) {
  // 检查 上传的图片格式与大小
  isAvatarFileChange.value = true

  if (file && file.name) {
    const arr = file.name.split(".")
    const type = arr[file.name.split(".").length - 1]
    const typeList = ["jpg", "png", "jpeg"]
    if (!typeList.some((item) => item == type)) {
      uploadRef.value?.clearFiles()
      return message.warning("只能上传jpg/png/jpeg图片格式文件")
    }
    if (file.raw.size > 3 * 1024 * 1024) {
      uploadRef.value?.clearFiles()
      return message.warning("只能上传3M以内大小的图片")
    }
  }

  fileName.value = file.name

  fileFile.value = file

  if (!fileName.value || !window.FileReader) return // 看支持不支持FileReader

  const reader = new FileReader()
  reader.readAsDataURL(file.raw) // 这里是最关键的一步，转换就在这里

  reader.onloadend = function () {
    headerImg.value = reader.result + ""
  }
}

async function upHeader() {
  const params = new FormData() // 创建form对象
  params.append("imageFile", fileFile.value.raw)
  return await uploadWithGroupId(params)
}

/**
 * @description 提交修改
 */
async function onSubmit() {
  baseInfoFormRef.value?.validate(async (valid: any) => {
    if (valid) {
      if (
        headerImg.value != baseInfoForm.value.photoUrl &&
        headerImg.value &&
        isAvatarFileChange.value
      ) {
        const headerRes = await upHeader()
        if (headerRes && headerRes.code == 200) {
          baseInfoForm.value.photo = headerRes.data.fileId
        } else {
          message.error("头像上传失败")
        }
      }
      try {
        const res = await personalCenterEdit(baseInfoForm.value)
        if (res.code == 200) {
          message.success("提交成功")
          isAvatarFileChange.value = false
        } else {
          message.warning(res.msg)
        }
      } catch (err: any) {
        const msg = err.response?.data?.msg
        message.error(msg || "操作失败")
      }
    }
  })
}

onMounted(() => {
  getDetails()
})
</script>

<template>
  <div class="user-wrap">
    <div class="base-info-form">
      <el-form
        ref="baseInfoFormRef"
        :model="baseInfoForm"
        :rules="ruleValidate"
        inline
        label-width="90px"
      >
        <el-row class="info-row" :gutter="20">
          <el-col :span="13">
            <el-form-item label="所属组织：">
              {{ baseInfoForm.deptName || "--" }}
            </el-form-item>
            <el-form-item label="姓名：">
              {{ baseInfoForm.name || "--" }}
            </el-form-item>
            <el-form-item label="性别：">
              {{ baseInfoForm.sex === 0 ? "男" : "女" || "--" }}
            </el-form-item>
            <el-form-item label="身份证号：">
              {{ baseInfoForm.idCard || "--" }}
            </el-form-item>
            <el-form-item label="手机号码：">
              {{ baseInfoForm.phone || "--" }}
            </el-form-item>
            <el-form-item label="工作岗位：">
              {{ baseInfoForm.postionName || "--" }}
            </el-form-item>
            <el-form-item label="现居住址：">
              {{ baseInfoForm.address || "--" }}
            </el-form-item>
            <el-form-item label="工号：">
              <el-input v-model="baseInfoForm.staffNo" placeholder></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="baseInfoForm.email" placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="头像：">
              <div class="header-img">
                <div
                  v-if="headerImg"
                  class="img-box"
                  @mouseleave="leaveImg"
                  @mouseenter="enterImg"
                >
                  <el-image
                    class="el-image"
                    :src="headerImg"
                    :preview-src-list="[headerImg]"
                  >
                  </el-image>

                  <el-icon
                    v-if="showClearIcon"
                    class="el-icon-delete clear-icon"
                    @click="clearHeader"
                  >
                    <el-icon-delete />
                  </el-icon>
                </div>
                <el-upload
                  v-if="!headerImg"
                  ref="uploadRef"
                  class="upload-box"
                  action="#"
                  :on-change="changeFile"
                  :limit="1"
                  :show-file-list="false"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <div class="upload-des">
                    <el-icon class="upload-icon avatar-uploader-icon"><el-icon-plus /></el-icon>
                  </div>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-wrap {
  padding: 20px;
  height: 100%;

  .base-info-form {
    border: 1px solid #e4e7ed;
    padding: 20px;
    width: 620px;
    border-radius: 4px;
    border-bottom: 8px solid var(--el-color-primary);
    .info-row {
      padding: 0 0 20px;
    }
    .header-img {
      display: flex;
      align-items: center;
      justify-content: left;
      width: 100%;
      height: 140px;
      .img-box {
        display: flex;
        width: 200px;
        height: 140px;
        align-items: center;
        justify-content: left;
        :deep(.el-image) {
          width: 200px;
          height: 140px;
        }
        .el-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .clear-icon {
          font-size: 18px !important;
          color: #fa0909;
          cursor: pointer;
        }
      }
      .upload-box {
        display: flex;
        align-items: center;
        width: 100px;
        min-height: 100px;
        border: 0.1px solid var(--el-color-primary);
        border-radius: 50%;
        :deep(.el-upload) {
          width: 100%;
          .upload-des {
            margin: 0 auto;

            .clear-icon {
              color: #fa0909;
              &:hover {
                font-size: 18px !important;
              }
            }
          }
          .upload-icon {
            font-size: 50px !important;
            color: var(--el-color-primary);
          }
        }
      }
    }
    .btn-box {
      display: flex;
      width: 100%;
      margin-top: 30px;
      align-items: center;
      justify-content: center;
      .el-button + .el-button {
        margin-left: 30px;
      }
    }
  }
}
</style>
