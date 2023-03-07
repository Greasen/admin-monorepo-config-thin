// 表单提交防重放方法

import { ref } from 'vue'
import { getOperateToken } from '~/api/common/login'

export default () => {
  const operateToken = ref('')

  function getOperateTokenHandler() {
    getOperateToken({}).then(({ code, data }: any) => {
      if (code === '200')
        operateToken.value = data
    })
  }

  getOperateTokenHandler()

  return {
    operateToken,
    getOperateTokenHandler,
  }
}
