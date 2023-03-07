/**
 * 加密解密文件
 */

import gmCrypt from 'gm-crypt'
import md5 from 'js-md5'

import smCrypto from 'sm-crypto'
import { getSm4ConfigKey } from '~/api/common/login'
import { getSm4Config } from '~/config/crypt-params'

interface crypt {
  // 前端生成密钥的实例
  secretKeyInstance: boolean | any
  // 前端生成的公钥
  pubKey: string
  // 前端生成的私钥
  prvKey: string
  // 这里这个key值是通过前端生成的公钥向后端请求来的
  sm4ConfigKey: string | void
  // 用于完整性验证的key
  publicKeyForSm2: string
  // 完整性公钥
  getPublicKey: () => string
}

interface encryptParams {
  loginCode: string | number
  password: string | number
  captchaId: string | number
  captchaCode: string | number
}

export default class Encryption implements crypt {
  // 前端生成密钥的实例
  secretKeyInstance: boolean | any
  // 前端生成的公钥
  pubKey!: string
  // 前端生成的私钥
  prvKey!: string
  // 这里这个key值是通过前端生成的公钥向后端请求来的
  sm4ConfigKey!: string | void
  // 用于完整性验证的key
  publicKeyForSm2!: string

  getPublicKey!: () => string
  encryptionCount!: number
  maxCount!: number

  constructor() {
    this.createPubKey()

    return {
      // 完整性公钥
      getPublicKey: this.exportPublicKey.bind(this),
      // 刷新公钥
      updatePubKey: this.updatePubKey.bind(this),
      // 密码加密函数
      encryptPassWord: this.encryptPassWord.bind(this),
      // 登录参数加密函数
      encryptLoginParams: this.encryptLoginParams.bind(this),
      // 新增用户、编辑用户
      encryptUserParmas: this.encryptUserParmas.bind(this),
      secretKeyInstance: this.secretKeyInstance,
      pubKey: this.pubKey,
      prvKey: this.prvKey,
      sm4ConfigKey: this.sm4ConfigKey,
      publicKeyForSm2: this.publicKeyForSm2,
      encryptionCount: this.encryptionCount,
      maxCount: this.maxCount,
      exportPublicKey: this.exportPublicKey,
      secretKeyInstanceInit: this.secretKeyInstanceInit,
      createPubKey: this.createPubKey,
      getSm4ConfigKey: this.getSm4ConfigKey,
      sm4: this.sm4,
      sm2: this.sm2,
      md5: this.md5,
      sm3: this.sm3,
      decryptionFunc: this.decryptionFunc,
      formatPubKey: this.formatPubKey,
      doVerifySignature: this.doVerifySignature,
      sigValueHex: this.sigValueHex,
    }
  }

  // 导出用于完整性验证的key
  exportPublicKey(): string {
    return this.publicKeyForSm2
  }

  // 密钥实例初始化
  secretKeyInstanceInit(): void {
    if (!this.secretKeyInstance)
      this.secretKeyInstance = smCrypto.sm2
  }

  // 一、生成前端密钥对
  createPubKey(): void {
    this.secretKeyInstanceInit()

    const keypair = this.secretKeyInstance.generateKeyPairHex()

    this.pubKey = keypair.publicKey
    this.prvKey = keypair.privateKey

    this.getSm4ConfigKey(this.pubKey)
  }

  // 刷新pubKey
  updatePubKey(): void {
    this.createPubKey()
  }

  // 二、获取用于sm4加密使用的 sm4ConfigKey，及用于完整性验证的 publicKeyForSm2
  async getSm4ConfigKey(pubKey: string): Promise<any> {
    const {
      code,
      data: { symmetricKey, publicKey },
    } = (await getSm4ConfigKey({ publicKey: pubKey })) as any

    if (code === '200') {
      this.sm4ConfigKey = this.decryptionFunc(this.formatPubKey(symmetricKey))
      this.publicKeyForSm2 = publicKey
    }
  }

  // sm4加密
  sm4(pass: string | number | void, key: string | void): string {
    const SM4 = gmCrypt.sm4
    if (!key)
      return ''
    // 配置sm4参数
    const sm4Config = getSm4Config(key)
    const sm = new SM4(sm4Config)

    return sm.encrypt(pass)
  }

  // sm2加密
  sm2(pass: string | number | void): void {
    const publicKey = this.publicKeyForSm2
    // let privateKey = '' // 私钥

    const encryptData = this.secretKeyInstance.doEncrypt(pass, publicKey, 0) // 加密
    return encryptData
  }

  // sm5加密
  md5(pass: string | number | void): void {
    return md5(pass)
  }

  // 6、sm3加密
  sm3(pass: string): void {
    return smCrypto.sm3(pass)
  }

  // sm2解密
  decryptionFunc(encrypData: any): void {
    try {
      const result = this.secretKeyInstance.doDecrypt(encrypData, this.prvKey, 0) // 解密
      // console.log('【sm2解密结果】', result)
      this.encryptionCount = 0
      return result
    }
    catch (err) {
      console.error('sm2解密失败，重新获取...')
      this.encryptionCount++
      if (this.encryptionCount <= this.maxCount) {
        let timeout: any = setTimeout(() => {
          this.updatePubKey()
          clearTimeout(timeout)
          timeout = null
        }, 500)
      }
      else {
        console.error('sm2解密失败，请刷新页面')
      }
    }
  }

  /**
   * @Description 签名 sm2
   * @date 2021-06-11
   * @returns {any}
   */
  sigValueHex(msg: any): string {
    return this.secretKeyInstance.doSignature(msg, this.prvKey)
  }

  /**
   * @Description 验证签名结果 sm2
   * @date 2021-06-11
   * @returns {any}
   */
  doVerifySignature(msg: string): boolean {
    return this.secretKeyInstance.doVerifySignature(
      msg,
      this.sigValueHex(msg),
      this.pubKey,
    )
  }

  // 加密密码
  encryptPassWord(password: string, key = this.sm4ConfigKey): string {
    return this.sm4(password, key)
  }

  // 加密登录参数
  encryptLoginParams(params: encryptParams): string {
    // params拼接 (拼接时属性顺序必须按照约定顺序, 标点符号也不能增减)
    const paramStr
      = `loginCode:${params.loginCode},`
      + `password:${params.password},`
      + `captchaId:${params.captchaId},`
      + `captchaCode:${params.captchaCode}`

    // console.log('【before md5】', paramStr)

    // const md5Result = this.md5(paramStr)
    const sm3Result = this.sm3(paramStr)

    // console.log('【sm3Result】', sm3Result)

    // console.log('【md5Result】', md5Result)

    const sm2Result = `04${this.sm2(sm3Result)}`

    return sm2Result
  }

  // 新增用户、编辑用户
  encryptUserParmas(params: {
    loginCode: string | number
    employeeId: string | number
  }): string {
    const paramStr = `loginCode:${params.loginCode},employeeId:${params.employeeId}`
    // let paramStr =
    //   'loginCode:daping,employeeId:6c8011945c6a4ed6bbb618f9553a3b4d'

    const sm3Result = this.sm3(paramStr)

    console.log('---------------')
    console.log(paramStr)
    console.log(sm3Result)

    const sm2Result = `04${this.sm2(sm3Result)}`

    return sm2Result
  }

  formatPubKey(pubKey: string): string {
    const msg = pubKey.toLowerCase()
    if (msg.substr(0, 2) === '04')
      return msg.substr(2)

    return msg
  }
}
