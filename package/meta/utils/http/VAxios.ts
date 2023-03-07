import type { AxiosError, AxiosInstance, AxiosResponse, Method, ResponseType } from 'axios'
import type { RequestConfig, Result } from '/#/api'
import axios from 'axios'
import { getAuthCache } from '../storage'
import { blobToObj } from '../tools'
import { AxiosCanceler } from './AxiosCanceler'
import { TOKEN_KEY } from '~/enum/cache'
import { ContentTypeEnum, RequestEnum } from '~/enum/http-enum'
import { message } from '~/hooks/setting/useMessage'
import { useUserWithOut } from '~/store/modules/user'
import { useSignaturewithOut } from '~/store/modules/signature'

const dogSign = useSignaturewithOut()
const userStore = useUserWithOut()

/**
 * axios 封装类
 */
export class VAxios {
  private service: AxiosInstance

  constructor(baseURL = '/api') {
    // 创建实例
    this.service = axios.create({
      baseURL,
      headers: {
        'Content-Type': ContentTypeEnum.JSON,
      },
      timeout: 50000, // 响应超时
    })
    this.setupInterceptors()
  }

  /**
   * @Description 设置拦截器和响应
   * @date 2022-03-25
   * @returns {any}
   */
  private setupInterceptors(): void {
    const axiosCanceler = new AxiosCanceler()
    // 发起请求之前的拦截器
    this.service.interceptors.request.use((config: RequestConfig) => {
      /**
       * 实现自己的业务逻辑
       * 1.开启全屏加载动画之类
       * 2.数据加密config。data
       * 3.给请求头添加信息等（token 结合sessionStorage，localStorage,vuex这些）
       * 4.每次请求更新加密狗签名，加密狗
       * 5.取消中断请求
       */

      const ignoreCancel = config.headers!.ignoreCancelToken

      if (ignoreCancel)
        axiosCanceler.addPending(config)

      // 如果有token 就携带tokon
      const token = getAuthCache(TOKEN_KEY)
      if (token)
        (config as any).headers.Authorization = token

      /**
       * 每次请求更新加密狗签名
       */
      dogSign.updateSignature();

      (config as any).headers.signature = dogSign.signature

      // showLoading

      return config
    }, (error: Error | AxiosError) => Promise.reject(error))

    // 响应拦截器
    this.service.interceptors.response.use((response: AxiosResponse) => {
      /**
       * 1. 关闭全屏loading动画
       * 2. 数据解密
       * 3. 根据 response.data.code 做不同的错误处理
       * 4. 重置取消请求函数
       *
       */

      response && axiosCanceler.removePending(response.config)
      // 接口请求成功，业务内部权限等相关情况非 200 提示，但是这边异常依然会抛给业务作相关的业务处理;
      if (response.data.code !== '200' && response.config.responseType !== 'blob')
        message.warning(response.data.msg)

      return response.data
    }, (error: AxiosError) => {
      /**
       * 1. 清空存储
       * 2. 登录跳转
       * 3. 多次请求应设置 count
       *
       */
      // 当导出文件时候，如果出现导出报错，则将返回的blob类型数据转化为json格式数据，并提示报错信息
      // response.data instanceof Blob
      if (error.response?.config?.responseType === 'blob') {
        blobToObj(error.response.data).then((data: any) => {
          message.error(data.data)
        })
        return Promise.reject(new Error('文件导出失败'))
      }

      if (error.response) {
        const code = error.response.status
        errTip(code)
        if (code === 401) {
          if (getAuthCache(TOKEN_KEY)) {
            message.warning((error?.response?.data as any)?.msg || 'token失效')
          }
          (userStore as any).setClearStorge()
        }
        else {
          message.warning((error?.response?.data as any)?.msg || '请求失败')
        }
      }
      return Promise.reject(error)
    })
  }

  public get<T>(url: string, params?: any, headers?: any, responseType: ResponseType = 'json'): Promise<Result<T>> {
    return this.request(RequestEnum.GET, url, params, headers, responseType)
  }

  public post<T>(url: string, params: any = {}, headers?: any, responseType: ResponseType = 'json'): Promise<Result<T>> {
    return this.request(RequestEnum.POST, url, params, headers, responseType)
  }

  public put<T>(url: string, params: any, headers?: any, responseType: ResponseType = 'json'): Promise<Result<T>> {
    return this.request(RequestEnum.PUT, url, params, headers, responseType)
  }

  public delete<T>(url: string, params: any, headers?: any, responseType: ResponseType = 'json'): Promise<Result<T>> {
    return this.request(RequestEnum.DELETE, url, params, headers, responseType)
  }

  public request<T>(method: Method, url: string, data?: any, headers?: any, responseType?: ResponseType): Promise<Result<T>> {
    return this.service.request({ method, url, data, headers, responseType })
  }
}

/**
 * @Description 捕获异常日志
 * @date 2022-03-26
 * @param {any} error:any
 * @param {any} msg:string='未知错误'
 * @returns {any}
 */
function errTip(code: number, msg = '未知错误'): void {
  const tip: { [key: number]: string } = {
    400: '请求错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: '请求地址出错',
    405: '请求方式不允许',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持',
  }
  console.warn(tip[code] || msg)
}
