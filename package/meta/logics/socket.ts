/**
 * 该类返回sendMessage函数
 */
import type { socketParma } from '/#/socket/socket'
import { useSocketWidthOut } from '../store/modules/socket'

const socketStore = useSocketWidthOut()

export default class Websocket implements socketParma {
  public wsUrl!: string
  public eventName!: string
  public socket!: any
  public socketInterval!: NodeJS.Timeout
  public timeout!: NodeJS.Timeout
  public isReconnect = false // 是否重连
  // 是否重连

  public constructor(wsUrl: any, eventName: any) {
    if (!wsUrl || !eventName) {
      console.error(
        '建立websocket连接需要【websocket接口】和【自定义事件名称】',
      )
      return
    }
    if (socketStore.eventNames.includes(eventName)) {
      console.error(`自定义事件名称${eventName}已存在，请重新命名`)
      return
    }
    socketStore.addEventName(this.eventName)
    this.eventName = eventName
    this.wsUrl = wsUrl
    this.isReconnect = true
    this.createSocket(undefined)

    return {
      wsUrl,
      eventName,
      socket: this.socket,
      socketInterval: this.socketInterval,
      timeout: this.timeout,
      sendMessage: this.sendMessage.bind(this),
      closeSocket: this.closeSocket.bind(this),
      reconnectSocket: this.reconnectSocket.bind(this),
      createSocket: this.createSocket,
      messageFunc: this.messageFunc,
      openFunc: this.openFunc,
      errorFunc: this.errorFunc,
      closeFunc: this.closeFunc,
      connecting: this.connecting,
      sendPing: this.sendPing,
      removeEventName: this.removeEventName,
      isReconnect: this.isReconnect,
    }
  }

  public createSocket(url: undefined) {
    try {
      if (url)
        this.wsUrl = url

      if (!this.socket) {
        this.socket = new WebSocket(this.wsUrl)
        this.socket.onopen = this.openFunc.bind(this)
        this.socket.onmessage = this.messageFunc.bind(this)
        this.socket.onerror = this.errorFunc.bind(this)
        this.socket.onclose = this.closeFunc.bind(this)
      }
      else {
        this.socket.close()
        this.socket = null
        this.createSocket(undefined)
      }
    }
    catch (error) {
      this.removeEventName()
    }
  }

  /* 推送监听 */
  public messageFunc(e: { data: any }) {
    try {
      window.dispatchEvent(
        new CustomEvent(this.eventName, { detail: e.data }),
      )
    }
    catch (err) {
      console.warn(err)
    }
  }

  public openFunc() {
    this.sendPing()
  }

  /**
   * @Description 错误
   * @date 2021-10-19
   * @returns {void}
   */
  public errorFunc(): void {
    this.socket.close()
    this.reconnectSocket()
  }

  /**
   * @Description 重连socket
   * @date 2021-10-19
   * @returns {void}
   */
  public reconnectSocket(): void {
    this.timeout = setTimeout(() => {
      clearInterval(this.socketInterval)
      if (this.isReconnect) {
        console.warn(`【${this.eventName}】连接失败重连中`)
        this.socket = null
        this.createSocket(undefined)
      }
      clearTimeout(this.timeout)
    }, 3000)
  }

  /* 断开 */
  public closeFunc() {
    console.warn(`【${this.eventName}】websocket已断开`)
    this.reconnectSocket()
  }

  /**
   * @Description 手动关闭连接
   * @date 2021-10-19
   * @returns {void}
   */
  public closeSocket(): void {
    this.isReconnect = false
    clearInterval(this.socketInterval)
    this.socket.close()
    this.removeEventName()
    clearTimeout(this.timeout)
    ; (this.timeout as unknown) = null
  }

  /* 发送消息 */
  public sendMessage(message: string) {
    if (this.socket !== null && this.socket.readyState === 3) {
      this.socket.close()
      this.createSocket(undefined)
    }
    else if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify(message))
    }
    else if (this.socket.readyState === 0) {
      this.connecting(message)
    }
  }

  /**
   * 发送数据但连接未建立时进行处理等待重发
   * @param {any} message 需要发送的数据
   */
  public connecting(message: string) {
    const timeout = setTimeout(() => {
      if (this.socket.readyState === 0)
        this.connecting(message)
      else
        this.socket.send(JSON.stringify(message))

      clearTimeout(timeout)
    }, 1000)
  }

  /** 发送心跳
   * @param {number} time 心跳间隔毫秒 默认60000
   * @param {string} ping 心跳名称 默认字符串ping
   */
  public sendPing(time = 30000, ping = 'ping') {
    clearInterval(this.socketInterval)
    this.socket.send(ping)
    this.socketInterval = setInterval(() => {
      this.socket.send(ping)
    }, time)
  }

  // 删除事件名称
  public removeEventName() {
    socketStore.removeEventName(this.eventName)
  }
}
