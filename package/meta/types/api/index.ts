import type { AxiosRequestConfig, Cancel } from 'axios'

export interface requestParams {
  [key: string]: unknown | string | any
}

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestConfig extends AxiosRequestConfig {
  cancelToken?: CancelToken
  cancelId?: string | null
  ignoreCancelToken?: boolean
}

declare interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested: () => void
}

export interface RetryRequest {
  isOpenRetry: boolean
  count: number
  waitTime: number
}
export interface Result<T = any> {
  data?: any
  code: number | string
  type: 'success' | 'error' | 'warning'
  message?: string
  msg: string
  result: T
}

export interface ResponseData<T> {
  status: number
  message?: string
  data: T
  code: string
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}

export interface apiConfigParma {
  [key: string]: apiParma
}

/**
 * interface ApiParma
 *
 * development: {
 *  baseUrl: string
    socketApi: string
    notificationSocketApi?: string
 * }
   production: {
 *  baseUrl: string
    socketApi: string
    notificationSocketApi?: string
 * }
 */
export interface ApiParma {
  [key: string]: stringKey
}
