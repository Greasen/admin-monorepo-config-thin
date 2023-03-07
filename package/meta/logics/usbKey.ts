export default class UsbKey {
  usbKeySocket: any
  constructor() {
    const isIE11
      = navigator.userAgent.includes('Trident')
      && navigator.userAgent.includes('rv:11.0')
    const isEDGE = navigator.userAgent.includes('Edge')
    /* 判断是http还是https */
    const u = document.URL
    let url
    if (u.substring(0, 5) === 'https') {
      if (isIE11 || isEDGE)
        url = 'wss://127.0.0.1:4006/xxx'
      else
        url = 'ws://127.0.0.1:4006/xxx'
    }
    else {
      url = 'ws://127.0.0.1:4006/xxx'
    }

    if (typeof window.MozWebSocket !== 'undefined')
      this.usbKeySocket = new (window as any).MozWebSocket(url, 'usbkey-protocol')
    else
      this.usbKeySocket = new WebSocket(url, 'usbkey-protocol')
  }

  /*    FindPort 功能：查找系统中是否存在第N个加密锁，如果存在，则返回该加密锁所在的设备路径

   参数1－－start(in)； 要查找的第N个加密锁，例：当start=0时，指的是要查找第一个加密锁所在的设备路径，当start=1时，指的是要查找系统中的第二个加密锁所在的设备路径。

   参数2――OutPath(out)；如果系统中存在第N个加密锁，则该参数中包含有该加密锁所在的设备路径

   返回结果－－若函数返回0，则表示函数执行成功，系统中存在着第N个加密锁，若返回其它值，则表示函数失败，错误原因可以参见错误代码含义
*/
  FindPort = (start: any) => {
    const msg = {
      FunName: 'FindPort',
      start,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  FindPort_2 = (start: any, in_data: any, verf_data: any) => {
    const msg = {
      FunName: 'FindPort_2',
      start,
      in_data,
      verf_data,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  FindPort_3 = (start: any, in_data: any, verf_data: any) => {
    const msg = {
      FunName: 'FindPort_3',
      start,
      in_data,
      verf_data,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* GetVersion 功能：返回指定加密锁的版本号

   参数１－－Version(out)； 当方法执行成功后，该参数包含有加密锁的版本号

   参数2――InPath (in)；加密锁所在的设备路径

   返回结果－－如果LastError的值为0，则表示方法执行成功，则返回结果为该加密锁的版本号。如果LastError值为其它值，则表示方法失败，错误原因可以参见错误代码含义
*/
  GetVersion = (Path: any) => {
    const msg = {
      FunName: 'GetVersion',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GetVersionEx = (Path: any) => {
    const msg = {
      FunName: 'GetVersionEx',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* Long GetID_1(InPath As String)

功能：返回指定加密锁的ID号的前4个字节；加密锁的ID号由8个字节组成，

参数1――InPath (in)；加密锁所在的设备路径

返回结果－－如果LastError的值为0，则表示方法执行成功，则返回结果为该加密锁的ID号的前4个字节。如果LastError值为其它值，则表示方法失败，错误原因可以参见错误代码含义

*/
  GetID_1 = (Path: any) => {
    const msg = {
      FunName: 'GetID_1',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 功能：返回指定设备路径的加密锁的ID号的后4个字节；加密锁的ID号由8个字节组成，

参数1――InPath (in)；加密锁所在的设备路径

返回结果－－如果LastError的值为0，则表示方法执行成功，则返回结果为该加密锁的ID号的后4个字节。如果LastError值为其它值，则表示方法失败，错误原因可以参见错误代码含义

*/
  GetID_2 = (Path: any) => {
    const msg = {
      FunName: 'GetID_2',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sRead = (Path: any) => {
    const msg = {
      FunName: 'sRead',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sWrite = (InData: any, Path: any) => {
    const msg = {
      FunName: 'sWrite',
      InData,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sWrite_2 = (InData: any, Path: any) => {
    const msg = {
      FunName: 'sWrite_2',
      InData,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sWrite_2Ex = (InData: any, Path: any) => {
    const msg = {
      FunName: 'sWrite_2Ex',
      InData,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sWriteEx = (InData: any, Path: any) => {
    const msg = {
      FunName: 'sWriteEx',
      InData,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sWriteEx_New = (InData: any, Path: any) => {
    const msg = {
      FunName: 'sWriteEx_New',
      InData,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  sWrite_2Ex_New = (InData: any, Path: any) => {
    const msg = {
      FunName: 'sWrite_2Ex_New',
      InData,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* SetCal功能：设置数据缓冲区，开发商可以使用此方法将要写入到储存器的数据放置在该数据缓冲区中，然后调用YWriteEx方法将数据缓冲区中的数据写入到储存器中。

参数1――要放置到数据缓冲区中的数据，会自动将整形转化为字节，

参数2――要放置到数据缓冲区中的位置

返回结果－－若方法返回0，则表示方法执行成功，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义

*/
  SetCal = (Hkey: any, Lkey: any, new_Hkey: any, new_Lkey: any, Path: any) => {
    const msg = {
      FunName: 'SetCal',
      Hkey,
      Lkey,
      new_Hkey,
      new_Lkey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }
  /* 方法原形：SetBuf( Data As Integer, pos As Integer) As Integer

功能：设置数据缓冲区，开发商可以使用此方法将要写入到储存器的数据放置在该数据缓冲区中，然后调用YWriteEx方法将数据缓冲区中的数据写入到储存器中。

参数1――要放置到数据缓冲区中的数据，会自动将整形转化为字节，

参数2――要放置到数据缓冲区中的位置

返回结果－－若方法返回0，则表示方法执行成功，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义

*/

  SetBuf = (InData: any, pos: any) => {
    const msg = {
      FunName: 'SetBuf',
      InData,
      pos,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 方法原形：GetBuf(pos As Integer) As Integer

功能：从数据缓冲区的指定位置取回数据，开发商在调用YReadEx方法,应立即调用该方法从数据缓冲区中取回数据

参数1――要取出的数据在数据缓冲区的位置

返回结果－－若方法返回0，则表示方法执行成功，返回的对应的缓冲区的数据，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义。

*/
  GetBuf = (pos: any) => {
    const msg = {
      FunName: 'GetBuf',
      pos,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 方法原型：YRead ( Address As Integer， Hkey As String, Lkey As String, InPath  As String)As Integer

功能：从加密锁的指定储存地址读取一个字节的数据。

参数1――Address；要读取的加密锁内部地址。

参数2――HKey；读密码的高八位密码

参数3――Lkey；读密码的低八位密码

参数4――InPath (in)；加密锁所在的设备路径

返回结果－－如果LastError的值为0，则表示函数执行成功，则返回结果为加密锁address的储存空间中储存的数据。如果LastError值为其它值，则表示函数失败，错误原因可以参见错误代码含义。

提示1：在读加密锁的储存器空间时，需要输入读密码，所有加密锁出厂时的读密码均为“FFFFFFFF”――“FFFFFFF”，如果密码错误，将不能正确从储存器中读出数据。

*/
  YRead = (Address: any, HKey: any, LKey: any, Path: any) => {
    const msg = {
      FunName: 'YRead',
      Address,
      HKey,
      LKey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }
  /* 方法原形：YWrite(InData As Integer, Address As Integer,Hkey As String, Lkey As String, InPath  As String)

        功能：向加密锁内部的储存空间写入一个字节的数据

        参数1――InData ；要写入到加密锁中的数据。

        参数2――address；用户指定的加密锁内部地址空间的起始地址。

        参数3――HKey；读密码的高八位密码

        参数4――Lkey；读密码的低八位密码

        参数5――InPath (in)；加密锁所在的设备路径

        返回结果－－若方法返回0，则表示方法执行成功，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义。

        提示1：在写加密锁的储存器空间时，需要输入写密码，所有加密锁出厂时的写密码均为“FFFFFFFF”――“FFFFFFF”，如果密码错误，将不能正确地写数据到储存器中。

   */

  YWrite = (InData: any, Address: any, HKey: any, LKey: any, Path: any) => {
    const msg = {
      FunName: 'YWrite',
      InData,
      Address,
      HKey,
      LKey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* YReadEx ( Address As Integer，m_len As Integer, Hkey As String, Lkey As String, InPath  As String)As Integer

功能：从加密锁的指定储存空间地址读出数据，该函数用于读取一批数据

参数1――Address；要读取的加密锁内部地址空间。

参数2――m_len：要读取数据的长度

参数3――HKey；读密码的高八位密码

参数4――Lkey；读密码的低八位密码

参数5――InPath (in)；加密锁所在的设备路径

返回结果－－如果返回结果为0，则表示方法执行成功，开发商可以调用GetBuf方法从数据缓冲区中取回数据。如果为其它值，则表示方法失败，错误原因可以参见错误代码含义。

提示1：在读加密锁的储存器空间时，需要输入读密码，所有加密锁出厂时的读密码均为“FFFFFFFF”――“FFFFFFF”，如果密码错误，将不能正确从储存器中读出数据。

提示2：开发商在调用YReadEx方法后,应立即调用GetBuf方法从数据缓冲区中取回数据
*/
  YReadEx = (Address: any, len: any, HKey: any, LKey: any, Path: any) => {
    const msg = {
      FunName: 'YReadEx',
      Address,
      len,
      HKey,
      LKey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 方法原形：YWriteEx(Address As Integer，m_len As Integer, Hkey As String, Lkey As String, InPath  As String)

功能：向加密锁内部的储存空间写入指定的数据，该函数用于写入一批数据

参数1――address；用户指定的加密锁内部地址空间的起始地址。

参数2――m_len：要写入的数据的长度

参数3――HKey；读密码的高八位密码

参数4――Lkey；读密码的低八位密码

参数5――InPath (in)；加密锁所在的设备路径

返回结果－－若方法返回0，则表示方法执行成功，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义。

提示1：在写加密锁的储存器空间时，需要输入写密码，所有加密锁出厂时的写密码均为“FFFFFFFF”――“FFFFFFF”，如果密码错误，将不能正确地写数据到储存器中。

提示2：在调用YwriteEx前，需要要先调用SetBuf方法，将要写入到储存器的数据放置在该数据缓冲区中，然后调用YwriteEx方法将数据缓冲区中的数据写入到储存器中。
*/
  YWriteEx = (Address: any, len: any, HKey: any, LKey: any, Path: any) => {
    const msg = {
      FunName: 'YWriteEx',
      Address,
      len,
      HKey,
      LKey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 方法原型：YreadString ( Address As Integer，len As Integer, Hkey As String, Lkey As String, InPath  As String) As String

功能：从加密锁的指定起始位置读取字符串。

参数1――Address；要读出的字符串储存在加密锁的起始位置

参数2――Len；   要读取的字符串的长度。

参数3――HKey；读密码的高八位密码

参数4――Lkey；读密码的低八位密码

参数5――InPath (in)；加密锁所在的设备路径

返回结果－－如果LastError的值为0，则表示方法执行成功，则返回结果为加密锁address的储存空间中储存的字符串。如果LastError值为其它值，则表示方法失败，错误原因可以参见错误代码含义。

*/
  YReadString = (Address: any, len: any, HKey: any, LKey: any, Path: any) => {
    const msg = {
      FunName: 'YReadString',
      Address,
      len,
      HKey,
      LKey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* v方法原形：YWriteString(InString As integer, Address As Integer，Hkey As String, Lkey As String, InPath  As String) AS Integer

功能：往加密锁内部的储存空间写入指定的数据。

参数１－－InString；要写入到加密锁储存空间的字符串。

参数2――address；用户指定的要写入加密锁内部地址的起始位置

参数3――HKey；写密码的高八位密码

参数4――Lkey；写密码的低八位密码

参数5――InPath (in)；加密锁所在的设备路径

返回结果－－如果LastError的值为0，则表示方法执行成功，则返回写入到储存器的字符串的长度，在使用YreadStirng方法读字符串时，可以以此作为长度的参数。若返回其它值，则表示方法失败，错误原因可以参见错误代码含义。

提示：在写加密锁的储存器空间时，需要输入写密码，所有加密锁出厂时的写密码均为“FFFFFFFF”――“FFFFFFF”，如果密码错误，将不能正确地写数据到储存器中。

*/
  YWriteString = (InString: any, Address: any, HKey: any, LKey: any, Path: any) => {
    const msg = {
      FunName: 'YWriteString',
      InString,
      Address,
      HKey,
      LKey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 方法原形：SetWritePassword (W_Hkey As String, W_Lkey As String，new_Hkey As String, new_Lkey As String, InPath  As String) As Integer

功能：设置加密锁的写密码

参数１－－W_Hkey；写密码的高八位。

参数2――W_Lkey；写密码的低八位。

参数3――new_Hkey；要设置的新的写密码的高八位

参数4――new_Lkey；要设置的新的写密码的低八位

参数5――InPath (in)；加密锁所在的设备路径

返回结果－－若方法返回0，则表示方法执行成功，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义。

注意：设置读密码是用“写”密码设置，而不原来的“读”密码

*/
  SetWritePassword = (W_Hkey: any, W_Lkey: any, new_Hkey: any, new_Lkey: any, Path: any) => {
    const msg = {
      FunName: 'SetWritePassword',
      W_Hkey,
      W_Lkey,
      new_Hkey,
      new_Lkey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 方法原形：SetReadPassword (W_Hkey As String, W_Lkey As String，new_Hkey As String, new_Lkey As String, InPath  As String) As Integer

功能：设置加密锁的读密码

参数1－－W_Hkey；写密码的高八位。

参数2――W_Lkey；写密码的低八位。

参数3――new_Hkey；要设置的新的读密码的高八位

参数4――new_Lkey；要设置的新的读密码的低八位

参数5――InPath (in)；加密锁所在的设备路径

返回结果－－若方法返回0，则表示方法执行成功，若返回其它值， 则表示方法失败，错误原因可以参见错误代码含义。

*/
  SetReadPassword = (W_Hkey: any, W_Lkey: any, new_Hkey: any, new_Lkey: any, Path: any) => {
    const msg = {
      FunName: 'SetReadPassword',
      W_Hkey,
      W_Lkey,
      new_Hkey,
      new_Lkey,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* void DecString(  char *InString,char *OutString,char *Key);(重要，这个函数一般不要使用 )

功能：使用Tea算法对加密后的字符串进行解密，解密过程在Dll中进行，而非硬件中进行

参数1－－InString(in)；要解密的字符串，这里的字符串必须是使用EncSring函数加密得到的字符串

参数2――OutString(out)；解密后字符串。

参数3――Key(in)；解密密钥

注意：这个函数一般不要使用，因为我们的DLL是固定的，且解密时要提供对应的解密密钥，所以容易被黑客捕获其加密密钥；如实际需要解密，可以在程序中直接使用TEA算法的解密代码，而不要使用这个DLL中提供的函数

提示1：这里的解密过程是在我们的Dll中进行，而非是硬件中进行

提示2：解密后的字符串的长度是原来字符串长度的2分之一

提示3：解密密钥必须要与加密密钥相对应

提示4、解密过程如下：先将16进制字符串转换成字节数组，然后调用CAL函数对数据进行解密，并将结果返回。
*/
  DecString = (InString: any, Key: any) => {
    const msg = {
      FunName: 'DecString',
      InString,
      Key,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 功能：使用增强算法对字符串进行加密

参数1－－InString(in)；要加密的字符串。

参数2――OutString(out)；加密后字符串。

参数3――InPath (in)；加密锁所在的设备路径

返回结果－－若函数返回0，则表示函数执行成功，若返回其它值， 则表示函数失败，错误原因可以参见错误代码含义

提示1：增强算法是一个标准的TEA算法,EcnString函数与TEA算法的加密过程相对应

提示2：要加密字符串以8个字节为一个分组；要加密的字符串少于8个字节时，不足的字节补数据0；要加密的字符串大于8个字节，但不是8的倍数时，多余的数据不作加密处理

提示3：字符串的加密过程，是先将字符串转化为字节数组，然后调用CAL函数对数据进行加密，加密后的数据将会以16进制字符串的形式返回，所以加密后的字符串的长度是原来要加密字符串的长度(含结束字符)的两倍，且至少不少于16个字符串，
*/
  EncString = (InString: any, Path: any) => {
    const msg = {
      FunName: 'EncString',
      InString,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  EncString_New = (InString: any, Path: any) => {
    const msg = {
      FunName: 'EncString_New',
      InString,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 功能：使用增强算法对数据进行加密

   参数1－－InBuf(in)；要加密的数据缓冲区。

   参数2――OutBuf(out)；返回加密后的数据缓冲区。

   参数3――InPath (in)；加密锁所在的设备路径

   返回结果－－若函数返回0，则表示函数执行成功，若返回其它值， 则表示函数失败，错误原因可以参见错误代码含义

   提示1：增强算法是一个标准的TEA算法，Cal函数与TEA算法的加密过程相对应

   提示2：Cal函数一次只能对8个字节进行加密，且必须为8的字节
*/
  Cal = (Path: any) => {
    const msg = {
      FunName: 'Cal',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  Cal_New = (Path: any) => {
    const msg = {
      FunName: 'Cal_New',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SetCal_2 = (Key: any, Path: any) => {
    const msg = {
      FunName: 'SetCal_2',
      Key,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SetCal_New = (Key: any, Path: any) => {
    const msg = {
      FunName: 'SetCal_New',
      Key,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SetEncBuf = (InData: any, pos: any) => {
    const msg = {
      FunName: 'SetEncBuf',
      InData,
      pos,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GetEncBuf = (pos: any) => {
    const msg = {
      FunName: 'GetEncBuf',
      pos,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  ReSet = (Path: any) => {
    const msg = {
      FunName: 'ReSet',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SetID = (Seed: any, Path: any) => {
    const msg = {
      FunName: 'SetID',
      Seed,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* 生产日期 */
  GetProduceDate = (Path: any) => {
    const msg = {
      FunName: 'GetProduceDate',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  /* mac 地址 */
  MacAddr = function (this: UsbKey) {
    const msg = {
      FunName: 'MacAddr',
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GetChipID = (Path: any) => {
    const msg = {
      FunName: 'GetChipID',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  StarGenKeyPair = (Path: any) => {
    const msg = {
      FunName: 'StarGenKeyPair',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GenPubKeyY = function (this: UsbKey) {
    const msg = {
      FunName: 'GenPubKeyY',
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GenPubKeyX = function (this: UsbKey) {
    const msg = {
      FunName: 'GenPubKeyX',
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GenPriKey = function (this: UsbKey) {
    const msg = {
      FunName: 'GenPriKey',
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GetPubKeyY = (Path: any) => {
    const msg = {
      FunName: 'GetPubKeyY',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GetPubKeyX = (Path: any) => {
    const msg = {
      FunName: 'GetPubKeyX',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  GetSm2UserName = (Path: any) => {
    const msg = {
      FunName: 'GetSm2UserName',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  Set_SM2_KeyPair = (PriKey: any, PubKeyX: any, PubKeyY: any, sm2UserName: any, Path: any) => {
    const msg = {
      FunName: 'Set_SM2_KeyPair',
      PriKey,
      PubKeyX,
      PubKeyY,
      sm2UserName,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  YtSign = (SignMsg: any, Pin: any, Path: any) => {
    const msg = {
      FunName: 'YtSign',
      SignMsg,
      Pin,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  YtSign_2 = (SignMsg: any, Pin: any, Path: any) => {
    const msg = {
      FunName: 'YtSign_2',
      SignMsg,
      Pin,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  YtVerfiy = (id: any, SignMsg: any, PubKeyX: any, PubKeyY: any, VerfiySign: any, Path: any) => {
    const msg = {
      FunName: 'YtVerfiy',
      id,
      SignMsg,
      PubKeyX,
      PubKeyY,
      VerfiySign,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SM2_DecString = (InString: any, Pin: any, Path: any) => {
    const msg = {
      FunName: 'SM2_DecString',
      InString,
      Pin,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SM2_EncString = (InString: any, Path: any) => {
    const msg = {
      FunName: 'SM2_EncString',
      InString,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  YtSetPin = (OldPin: any, NewPin: any, Path: any) => {
    const msg = {
      FunName: 'YtSetPin',
      OldPin,
      NewPin,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  FindU = (start: any) => {
    const msg = {
      FunName: 'FindU',
      start,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  FindU_2 = (start: any, in_data: any, verf_data: any) => {
    const msg = {
      FunName: 'FindU_2',
      start,
      in_data,
      verf_data,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  FindU_3 = (start: any, in_data: any, verf_data: any) => {
    const msg = {
      FunName: 'FindU_3',
      start,
      in_data,
      verf_data,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  IsUReadOnly = (Path: any) => {
    const msg = {
      FunName: 'IsUReadOnly',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SetUReadOnly = (Path: any) => {
    const msg = {
      FunName: 'SetUReadOnly',
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  SetHidOnly = (IsHidOnly: any, Path: any) => {
    const msg = {
      FunName: 'SetHidOnly',
      IsHidOnly,
      Path,
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  ResetOrder = function (this: UsbKey) {
    const msg = {
      FunName: 'ResetOrder',
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }

  ContinueOrder = function (this: UsbKey) {
    const msg = {
      FunName: 'ContinueOrder',
    }
    this.usbKeySocket.send(JSON.stringify(msg))
  }
}
