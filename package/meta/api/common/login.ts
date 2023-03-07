/**
 * login api
 */

import type { requestParams } from '/#/api'
import { Axios } from '~/utils/http'

/**
 * @Description 通过前端生成的公钥，想后端获取随机生成的sm4对称加密密匙，用于密码加密
 * @date 2021-06-10
 * @param {any} data
 * @returns {AxiosPromise<any>}
 */
export const getSm4ConfigKey = (data: requestParams) => {
  return Axios.post('admin/admin/publicKey', data)
}

/**
 * @Description 登录接口
 * @date 2021-06-10
 * @param {any} data
 * @returns {AxiosPromise<any>}
 */
export const goLogin = (data: requestParams) => {
  return Axios.post('admin/admin/login', data, { ignoreCancelToken: true })
}

/**
 * @Description 退出登录接口
 * @date 2021-06-10
 * @param {any} data
 * @returns {AxiosPromise<any>}
 */
export const goLogout = () => {
  return Axios.post('admin/admin/logout')
}

/**
 * @Description 更新密码
 * @date 2021-07-05
 * @param {any} params
 * @param {any} operateToken
 * @returns {any}
 */
export const updatePassWord = (data: requestParams, operateToken: string) => {
  return Axios.post('admin/user/changePassword', data, { operateToken })
}

/**
 * @Description 获取名称、备案号、是否展示验证码
 * @date 2021-06-10
 * @param {any} data
 * @returns {AxiosPromise<any>}
 */
export const search = (data: requestParams) => {
  return Axios.post('admin/config/search', data)
}

/**
 * @Description 获取验证码
 * @date 2021-06-10
 * @param {any} data
 * @returns {AxiosPromise<any>}
 */
export const getCodeImg = () => {
  return Axios.post('admin/admin/captcha')
}

/**
 * @Description 根据权限获取路由列表
 * @date 2021-06-10
 * @param {any} data
 * @returns {AxiosPromise<any>}
 */
export const getRouteList = (data: requestParams) => {
  return Axios.post('admin/permission/userLoginMenu', data)
}

/**
 * @Description 获取幂等防护token
 * @date 2021-07-03
 * @param {any} params
 * @returns {any}
 */
export const getOperateToken = (data: requestParams) => {
  return Axios.post('admin/operate/token', data)
}

/**
 * @Description 验证二次登陆
 * @date 2022-10-25
 * @param {any} data:requestParams
 * @returns {any}
 */
export const loginValidate = (data: requestParams) => {
  return Axios.post('admin/admin/validateLogin', data)
}
