/**
 * 签名相关状态管理
 */

import { defineStore } from 'pinia'
import { store } from '../index'
import SignatureEncryption from '~/logics/signature-encryption'
import { getAuthCache, removeAuthCache, setAuthCache } from '~/utils/storage'
import { USE_DOG_KEY } from '~/enum/cache'

interface signature {
  signaturePublic: string
  devicePath: string
  keyId: string
  dogKeyId: string
  singatureInstance: any
  signature: string
  prvKey: string
  isSignatureCheck: string
}

export const signatureStore = defineStore({
  id: 'signature-store',
  state: (): signature => ({
    // 加密狗的标识
    signaturePublic: '',
    // 加密狗的path
    devicePath: '',
    // 加密狗的id
    keyId: '',
    // 加密狗的key
    dogKeyId: getAuthCache('signature') || '',
    // 加密方法实例
    singatureInstance: null,
    // 加密狗签名
    signature: '',
    // 加密狗私钥
    prvKey: '',
    // 是否开启加密狗
    isSignatureCheck: '0'
  }),

  getters: {
    getSignatureCheck(): string {
      return this.isSignatureCheck
    }
  },

  actions: {
    // 设置是否开启加密狗
    setSignatureCheck(val = '0') {
      this.isSignatureCheck = val
      setAuthCache(USE_DOG_KEY, this.isSignatureCheck)
    },

    /**
     * @Description 设置加密狗 key
     * @date 2021-06-11
     * @param {any} _state:signature
     * @param {any} id:string
     * @returns {any}
     */
    setDogKey(id: string): void {
      try {
        if (/[a-zA-Z0-9]/.test(id))
          this.dogKeyId = id
        else
          this.dogKeyId = '0'
      }
      catch (e) {
        this.dogKeyId = ''
      }
      setAuthCache('signature', this.dogKeyId)
    },

    /**
     * @Description 设置设备路径
     * @date 2021-06-11
     * @param {any} devicePath
     * @returns {any}
     */
    setDevicePath(devicePath: string): void {
      this.devicePath = devicePath
    },

    /**
     * @Description 设置加密狗 id
     * @date 2021-06-11
     * @param {any} id :string
     * @returns {any}
     */
    setKeyId(id: string): void {
      this.keyId = id

      /**
       * @Description this.dogKeyId.length 必须大于4 否则 sm2 加密报错
       * 测试的时候放开，必须符合 sm2 加密规则
       * @date 2021-06-15
       * @param {any} this.keyId && this.dogKeyId.length>4
       * @returns {any}
       */
      if (this.keyId) {
        this.singatureInstance = new SignatureEncryption(
          this.keyId,
          this.dogKeyId,
        )
      }
      else {
        this.singatureInstance = null
      }
    },

    /**
     * @Description 更新加密狗
     * @date 2021-06-11
     * @returns {any}
     */
    updateSignature(): void {
      if (this.singatureInstance) {
        this.signature = this.singatureInstance.getSignature()
        this.prvKey = this.singatureInstance.getPrvKey()
      }
      else {
        this.signature = ''
        this.prvKey = ''
      }
    },

    /**
     * @Description 清空加密狗 key
     * @date 2021-06-11
     * @returns {any}
     */
    clearDogKey(): void {
      this.dogKeyId = ''
      removeAuthCache('signature')
    },
  },
})

export function useSignaturewithOut(): any {
  return signatureStore(store)
}
