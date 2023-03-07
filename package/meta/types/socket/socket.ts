/**
 * socket types
 * @parmas setInterval 与 clearInterval类型不对应问题 NodeJS.Timeout
 */
export interface socketType {
  reconnectTimer: Nullable<null> | number | NodeJS.Timeout // 关闭重连定时器
  heartbeatTimer: Nullable<null> | number | NodeJS.Timeout // 心跳定时器
  heartbeatTimeOutCount: number // 记录次数
  isDestroy: boolean // 是否销毁
  globalCallback: () => void // 建立心跳连接回调方法
  dataCallback: () => void // 数据回调方法
  body: WebSocket | undefined
  closeCount: number
}

/**
 * socket
 */
export interface socketParma {
  wsUrl: string
  eventName: string
  socket: WebSocket
  socketInterval: NodeJS.Timeout
  timeout: NodeJS.Timeout
  isReconnect: boolean
}

export type paramsType = Record<string, string | any>
