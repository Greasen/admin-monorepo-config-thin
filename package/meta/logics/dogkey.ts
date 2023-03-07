import { ElMessageBox } from 'element-plus'
import UsbKey from './usbKey'
import { router } from '~/router'
import { message } from '~/hooks/setting/useMessage'
import { useSignaturewithOut } from '~/store/modules/signature'

const dogSignStore = useSignaturewithOut()

export class DogKey {
  // usbKey 实例
  dogKeyInstance: boolean | any
  // 连接状态
  usbKeyConnect: number | undefined

  devicePath: string | undefined

  keyId_1: string | undefined

  keyId_2: string | undefined

  digitArray: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ]

  constructor() {
    this.dogInit()
  }

  // 加密狗初始化
  dogInit() {
    this.dogKeyInstance = new UsbKey()
    this.usbKeyConnect = 0

    this.dogKeyInstance.usbKeySocket.onopen = this.openFunc.bind(this)

    this.dogKeyInstance.usbKeySocket.onerror = this.errorFunc.bind(this)

    this.dogKeyInstance.usbKeySocket.onmessage = this.messageFunc.bind(this)

    this.dogKeyInstance.usbKeySocket.onclose = this.closeFunc.bind(this)
  }

  openFunc() {
    console.log('%c=> 数字证书已连接', 'background: green')
    this.usbKeyConnect = 1
    this.dogKeyInstance.ResetOrder()
  }

  errorFunc() {
    if (router.currentRoute.value.name !== 'Login')
      return

    ElMessageBox.confirm('是否下载数字证书插件?', '提示', {
      confirmButtonText: '下载',
      type: 'warning',
    }).then(() => {
      let setupPath = '/patrol-area/assets/dogkeyplugins/SetUp.zip'
      if (process.env.NODE_ENV === 'development')
        setupPath = '/assets/dogkeyplugins/SetUp.zip'

      window.open(setupPath)
    })
  }

  messageFunc(msg: { data: string }) {
    const UK_Data = JSON.parse(msg.data)

    if (UK_Data.type === 'PnpEvent') {
      // 如果是插拨事件处理消息
      // 在使用事件插拨时，注意，一定不要关掉Sockey，否则无法监测事件插拨
      if (UK_Data.IsIn) {
        message.success('数字证书已被插入')
        this.dogKeyInstance.ResetOrder()
        console.log(
          `数字证书已被插入，被插入的锁的路径是：${UK_Data.DevicePath}`,
        )
      }
      else {
        message.error('数字证书已被拨出')
        this.clearDogKey()
        this.setDevicePath('')
        this.setKeyId('')
        console.error(
          `数字证书已被拨出，被拨出的锁的路径是：${UK_Data.DevicePath}`,
        )
      }
    }
    else if (UK_Data.type === 'Process') {
      const dog = this.dogKeyInstance

      switch (UK_Data.order) {
        case 0:
          dog.FindPort(0) // 查找加密锁
          break
        case 1:
          if (UK_Data.LastError !== 0) {
            message.error('未发现数字证书，请插入数字证书')
            this.clearDogKey()
            return false
          }
          this.setDevicePath(UK_Data.return_value)
          this.devicePath = UK_Data.return_value
          dog.YReadString(0, 130, 'ffffffff', 'ffffffff', UK_Data.return_value)
          break
        case 2:
          if (UK_Data.LastError !== 0) {
            console.error(
              `读取数字证书错误，错误码为：${UK_Data.LastError.toString()}`,
            )
            return false
          }
          else {
            this.setDogKey(UK_Data.return_value)
            // console.log('【数字证书】', UK_Data.return_value)
            this.dogKeyInstance.GetID_1(this.devicePath)
          }
          break
        case 3:
          if (UK_Data.LastError !== 0) {
            console.error(
              `读取数字证书错误，错误码为：${UK_Data.LastError.toString()}`,
            )
            return false
          }
          else {
            this.keyId_1 = this.toHex(UK_Data.return_value)
            this.dogKeyInstance.GetID_2(this.devicePath)
          }
          break
        case 4:
          if (UK_Data.LastError !== 0) {
            console.error(
              `读取数字证书错误，错误码为：${UK_Data.LastError.toString()}`,
            )
            return false
          }
          else {
            this.keyId_2 = this.toHex(UK_Data.return_value)
            if (
              this.keyId_1
              && this.keyId_2
              && this.keyId_1.length === 8
              && this.keyId_2.length === 8
            ) {
              const keyId = this.keyId_1 + this.keyId_2
              this.setKeyId(keyId)
            }
            else {
              this.setKeyId('')
            }
          }
          break
      }
    }
  }

  toHex(n: number): string {
    let result = ''
    let start = true

    for (let i = 32; i > 0;) {
      i -= 4
      const digit = (n >> i) & 0xF

      if (!start || digit !== 0) {
        start = false
        result += this.digitArray[digit]
      }
    }

    return result === '' ? '0' : result
  }

  closeFunc() {}

  setDogKey(dogKey: string): void {
    dogSignStore.setDogKey(dogKey)
  }

  setDevicePath(devicePath: string): void {
    dogSignStore.setDevicePath(devicePath)
  }

  setKeyId(keyId: string): void {
    dogSignStore.setKeyId(keyId)
  }

  clearDogKey(): void {
    dogSignStore.clearDogKey()
  }
}
