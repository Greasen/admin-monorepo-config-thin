/**
 * 生成加密狗 id 及签名
 */

import smCrypto from 'sm-crypto'

interface signature {
  // 前端sm2生成密钥的实例
  secretKeyInstance: boolean | any
  // 密钥对
  pubKey: string
  prvKey: string

  // 源数据
  origin: string
  // 加密狗ID
  dog_id: string
  // 加密狗公钥（绑定加密狗时写入）
  dog_publicKey: string
  // 摘要
  digest: string
  // 初始的签名
  initialSignature: string
}

/**
 * constructor存在于静态部分，不在检查的范围内
 */
export default class SignatureEncryption implements signature {
  // 前端sm2生成密钥的实例
  secretKeyInstance: boolean | any
  // 密钥对
  pubKey!: string
  prvKey!: string

  // 源数据
  origin!: string
  // 加密狗ID
  dog_id: string
  // 加密狗公钥（绑定加密狗时写入）
  dog_publicKey: string
  // 摘要
  digest!: string
  // 初始的签名
  initialSignature!: string

  constructor(dog_id: string, dog_publicKey: string) {
    this.secretKeyInstanceInit()
    this.dog_id = dog_id
    this.dog_publicKey = dog_publicKey
    // 返回加密函数
    return {
      getSignature: this.getSignature.bind(this),
      getPrvKey: this.getPrvKey.bind(this),
      secretKeyInstance: this.secretKeyInstance,
      pubKey: this.pubKey,
      prvKey: this.prvKey,
      origin: this.origin,
      dog_id: this.dog_id,
      dog_publicKey: this.dog_publicKey,
      digest: this.digest,
      initialSignature: this.initialSignature,
      sm2: this.sm2,
      sm3: this.sm3,
      secretKeyInstanceInit: this.secretKeyInstanceInit,
      createKey: this.createKey,
    }
  }

  // 获取加密结果
  getSignature(): string {
    this.createKey()
    // 源数据
    this.origin = this.dog_id + this.pubKey
    // 摘要
    this.digest = this.sm3(this.origin)
    // 初始签名
    // this.initialSignature = '04' + this.sm2(this.digest, this.prvKey)
    this.initialSignature = this.secretKeyInstance.doSignature(
      this.digest,
      this.prvKey,
      {
        hash: true,
        der: true,
      },
    )

    const msg = {
      signature: this.initialSignature,
      digest: this.digest,
      // id: this.dog_id,
      clientPublicKey: this.pubKey,
    }

    const signature
      = `04${this.sm2(JSON.stringify(msg), this.dog_publicKey)}`

    // 最终的加密结果

    return signature
  }

  getPrvKey(): string {
    return this.prvKey
  }

  /**
   * 传入示例 key 必须是 16进制格式
   * @param pass SM2 Encryption Test
   * @param key 049548c4b143200b69f8e1d5b9444c5abfc1d9b823acb9ced6de0505d9f7b78cf0a44471b55a83601398428331d388e53652aed700c81036373a03930362b0d331
   * @returns
   */

  // sm2加密
  sm2(pass: string, key: string): string {
    let encryptData = ''
    if (key !== '0')
      encryptData = this.secretKeyInstance.doEncrypt(pass, key, 0) // 加密

    return encryptData
  }

  // sm3加密
  sm3(pass: string): string {
    return smCrypto.sm3(pass)
  }

  // 密钥实例初始化
  secretKeyInstanceInit(): void {
    if (!this.secretKeyInstance)
      this.secretKeyInstance = smCrypto.sm2
  }

  // 生成前端密钥对
  createKey(): void {
    this.secretKeyInstanceInit()
    const keypair = this.secretKeyInstance.generateKeyPairHex()
    this.pubKey = keypair.publicKey
    this.prvKey = keypair.privateKey
  }
}
