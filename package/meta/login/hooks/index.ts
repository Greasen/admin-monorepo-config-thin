import type { Result } from '/#/api'
import { reactive, ref } from 'vue'
import { getCodeImg, goLogin, search } from '~/api/common/login'
import { NEED_CHANGE_PWD_KEY, PROJ_CFG_KEY } from '~/enum/cache'
import Encryption from '~/logics/crypt'
import { router } from '~/router'
import { useUserWithOut } from '~/store/modules/user'
import { dateFormat } from '~/utils/date'
import { setAuthCache } from '~/utils/storage'
import { message } from '~/hooks/setting/useMessage'
import { useSignaturewithOut } from '~/store/modules/signature'
import { VITE_STSYTM_TITLE_ } from '~/config/config'

const signatureStore = useSignaturewithOut()

const encry = new Encryption()

export function useLogin() {
  const store = useUserWithOut()

  const loginLoading = ref()

  const state = reactive({
    userName: '',
    password: '',
    code: '',
  })

  const codeImg = ref('')
  const captchaId = ref('')
  const title = ref('')
  const mark = ref('')
  const isCode = ref('')

  const isSignatureCheck = ref(signatureStore.isSignatureCheck)

  const needChangePwd = ref(false)

  const engTitle = 'Online intelligent inspection system of Substation'

  /**
   * @Description 验证码接口
   * @date 2022-10-20
   * @returns {any}
   */
  async function getCodeImgFn() {
    const res = await getCodeImg()
    codeImg.value = `data:image/png;base64,${res.data.captcha}`
    captchaId.value = res.data.captchaId
  }

  /**
   * @Description 查询系统配置
   * @date 2022-10-20
   * @param {any} key:string
   * @returns {any}
   */
  async function searchConfig(key: string) {
    const res = await search({ key })
    if (res.data && key === 'appName')
      title.value = res.data.value

    if (res.data && key === 'clientrecordno')
      mark.value = res.data.value

    if (res.data && key === 'captchaRequired')
      isCode.value = res.data.value

    if (res.data && key === 'isSignatureCheck') {
      isSignatureCheck.value = res.data.value
    }

    signatureStore.setSignatureCheck(isSignatureCheck.value)
    document.title = title.value || VITE_STSYTM_TITLE_
    setAuthCache(PROJ_CFG_KEY, title.value as string)
  }

  /**
   * @Description 刷新验证码
   * @date 2022-10-20
   * @returns {any}
   */
  function fresh() {
    getCodeImgFn()
    encry.updatePubKey()
  }

  function openFullScreen() {
    loginLoading.value = true
  }

  /**
   * @Description 登录
   * @date 2022-10-20
   * @returns {any}
   */
  async function logIn() {
    if (!state.userName) {
      message.error({
        message: '请输入用户名',
        duration: 0,
      })
      return
    }
    if (!state.password) {
      message.error('请输入密码')
      return
    }
    if (isCode.value === '1' && !state.code) {
      message.error('请输入验证码')
      return
    }
    const password: string = encry.encryptPassWord(state.password)

    const prama = {
      loginCode: state.userName,
      password,
      captchaId: captchaId.value,
      captchaCode: isCode.value === '1' ? state.code : '',
    }

    const summaryText = encry.encryptLoginParams(prama)

    const result = {
      ...prama,
      summaryText,
      type: 1,
      publicKey: (encry as any).getPublicKey(),
    }

    openFullScreen()
    try {
      const res: Result = await goLogin(result)
      if (res.code !== '200') {
        getCodeImgFn()
        message.error(res.msg || '登录失败')
        loginLoading.value = false
        return
      }
      const token = res.data.token

      const userInfo = Object.assign({}, res.data)

      userInfo.createDate = dateFormat(res.data.createDate)
      userInfo.loginDate = dateFormat(res.data.loginDate)
      userInfo.photoUrl = dateFormat(res.data.photoUrl)

      // const userInfo = {
      //   user: res.data.name,
      //   userId: res.data.userId,
      //   employeeId: res.data.employeeId,
      //   createDate: dateFormat(res.data.createDate),
      //   loginDate: dateFormat(res.data.loginDate),
      //   loginEnable: res.data.loginEnable,
      //   loginIp: res.data.loginIp,
      //   loginCode: res.data.loginCode,
      //   modifyBy: res.data.modifyBy,
      //   photoUrl: res.data.photo,
      // }

      store.setToken(token)

      store.setUserInfo(userInfo)

      // 如果需要修改密码，则在缓存中设施为'1', 否则置为空
      setAuthCache(NEED_CHANGE_PWD_KEY, '')

      if (res.data.passModifyFlag === 1) {
        needChangePwd.value = true
        loginLoading.value = false
        message.error('密码已超期，请修改密码！')
        router.push('/change-password')
        setAuthCache(NEED_CHANGE_PWD_KEY, res.data.passModifyFlag)
        return
      }

      message.success('登录成功')
      loginLoading.value = false
      router.push('/')
    }
    catch (err) {
      state.code = ''
      loginLoading.value = false
      getCodeImgFn()
    }
  }

  return {
    state,
    codeImg,
    title,
    engTitle,
    getCodeImgFn,
    searchConfig,
    fresh,
    logIn,
    loginLoading,
  }
}
