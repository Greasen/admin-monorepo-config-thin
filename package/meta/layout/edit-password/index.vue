<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { updatePassWord } from '~/api/common/login'
import { USER_INFO_KEY } from '~/enum/cache'
import { message } from '~/hooks/setting/useMessage'
import useOperateToken from '~/hooks/web/useOperateToken'
import Encryption from '~/logics/crypt'
import { useUserWithOut } from '~/store/modules/user'
import { getAuthCache } from '~/utils/storage'
import { validatePass } from '~/utils/validate'

const emit = defineEmits(['updatePwd'])

const userStore = useUserWithOut()

const rules = {
  oldPwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
  newPwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
  surePwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
}

const form = reactive({
  oldPwd: '',
  newPwd: '',
  surePwd: '',
})

const ruleForm = ref()
const encryption = new Encryption()
const { operateToken, getOperateTokenHandler } = useOperateToken()

const checkPwd = (): boolean => {
  if (form.newPwd !== form.surePwd) {
    message.error('确认密码和新密码不一致')
    return false
  }
  else {
    return true
  }
}

const editPass = async () => {
  try {
    const {
      loginCode,
      employeeId,
    }: { loginCode: string; employeeId: string } = getAuthCache(USER_INFO_KEY)
      ? JSON.parse(getAuthCache(USER_INFO_KEY) as string)
      : {}

    const cipher = encryption.encryptUserParmas({
      loginCode,
      employeeId,
    })

    const operate = operateToken.value
    const params = {
      newPassword: encryption.encryptPassWord(form.newPwd),
      oldPassword: encryption.encryptPassWord(form.oldPwd),
      publicKey: encryption.getPublicKey(),
      cipher,
      employeeId,
    }

    const res = await updatePassWord(params, operate)
    if (res.code !== '200')
      return

    else
      getOperateTokenHandler()

    message.success('修改成功')
    userStore.setClearStorge()
    emit('updatePwd')
  }
  catch (error) {
    getOperateTokenHandler()
  }
}

const confirmPwd = async (): Promise<void> => {
  if (!checkPwd())
    return

  ruleForm.value.validate((valid: any) => {
    if (valid)
      editPass()
    else
      return false
  })
}

const resetPwd = (): void => {
  ruleForm.value.resetFields()
}
</script>

<template>
  <div class="edit-password">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input
          v-model="form.oldPwd"
          placeholder="请输入旧密码"
          show-password
          @keydown.enter="confirmPwd"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input
          v-model="form.newPwd"
          placeholder="请输入新密码"
          show-password
          @keydown.enter="confirmPwd"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="surePwd">
        <el-input
          v-model="form.surePwd"
          placeholder="确认新密码"
          show-password
          @keydown.enter="confirmPwd"
        />
      </el-form-item>
    </el-form>
  </div>
  <div class="word-btn">
    <el-button type="primary" @click="confirmPwd">
      提交
    </el-button>
    <el-button plain @click="resetPwd">
      重置
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.edit-password {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.word-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
