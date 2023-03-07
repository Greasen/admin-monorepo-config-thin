import { ElMessageBox } from 'element-plus'
import { loginValidate } from '~/api/common/login'
import { usePasswordVerify } from '~/config/config'
import { USER_INFO_KEY } from '~/enum/cache'
import Encryption from '~/logics/crypt'
import { getAuthCache } from '~/utils/storage'

const el = document.createElement('div')
el.setAttribute(
  'style',
  'position: fixed; width:100%;height:100%;top:0;left: 0;background: rgba(0,0,0,0.01)',
)

/**
 * @Description 重要操作的二次校验
 * @date 2022-10-26
 * @param {any} resourceName:string
 * @returns {any}
 */
export default async (resourceName: string) => {
  if (!usePasswordVerify)
    return ''

  document.body.appendChild(el)
  const { loginCode, employeeId }: { loginCode: string; employeeId: string }
    = getAuthCache(USER_INFO_KEY) ? JSON.parse(getAuthCache(USER_INFO_KEY) as string) : {}

  const encryption: any = new Encryption()

  return new Promise((resolve, reject) => {
    ElMessageBox.prompt('请输入登录密码', '身份鉴别', {
      inputType: 'password',
      customClass: 'password-prompt-box',
      inputPlaceholder: '请输入密码...',
      /**
       * messageBox 关闭前的回调，会暂停消息弹出框的关闭过程
       * @param action
       * @param instance
       * @param done
       */
      beforeClose: async (action, instance, done) => {
        try {
          if (action === 'cancel')
            return

          const inputValue = instance.inputValue
          const password = encryption.encryptPassWord(inputValue)

          const cipher = encryption.encryptUserParmas({
            loginCode,
            employeeId,
          })

          const params = {
            password,
            resourceName,
            publicKey: encryption.getPublicKey(),
            cipher,
            employeeId,
          }

          const { code, data, msg } = await loginValidate(params)

          if (code === '200' && data?.token) {
            resolve(data?.token)
          }
          else {
            ElMessageBox.alert(msg, '错误', {
              confirmButtonText: '确定',
              type: 'error',
              callback: (err: any) => {
                reject(err)
              },
            })
          }
        }
        catch (error) {
          reject(error)
        }

        document.body.removeChild(el)

        done()
      },

      /**
       * 输入框的校验函数
       * @param value
       * @returns
       */
      inputValidator(value) {
        if (!value)
          return '请输入密码'
        return true
      },
    })
  })
}
