import { SM_4_CONFIG_IV, SM_4_CONFIG_MODE } from "./config"

export const getSm4Config = (key: string) => {
  if (!key) {
    console.error('sm4加密缺少key')
    return
  }
  const config = {
    key, // 这里这个key值是通过前端生成的公钥向后端请求来的
    mode: SM_4_CONFIG_MODE,
    iv: SM_4_CONFIG_IV,
    cipherType: 'base64',
  }

  return config
}
