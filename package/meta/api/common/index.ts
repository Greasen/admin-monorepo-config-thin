import type { requestParams } from '/#/api'
import { Axios } from '~/utils/http'

/**
 * @Description  获取当前版本信息
 */
export const getCurrentVersion = () => {
  return Axios.get('admin/version/moduleVersion/getCurrentVersion', {})
}

/**
 * @Description  获取临时token，非登录
 */
export const linkageLogin = (data: requestParams) => {
  return Axios.post('admin/admin/linkageLogin', data)
}

/**
 * @Description  获取个人中心详情
 */
export const getBaseInfoDetails = () => {
  return Axios.post('admin/employee/self')
}

/**
 * @Description  个人中心提交修改
 */
export const personalCenterEdit = (data: requestParams) => {
  return Axios.post('admin/employee/editBySelf', data)
}

/**
 * @Description  上传头像
 */
export const uploadWithGroupId = (data: requestParams) => {
  return Axios.post('admin/employee/uploadPhoto', data, { 'ignoreCancelToken': true, 'Content-Type': 'multipart/form-data;' })
}
