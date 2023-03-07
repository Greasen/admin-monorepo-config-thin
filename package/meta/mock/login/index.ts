import MockJs from 'mockjs'

MockJs.mock('/admin/config/search', 'post', (options: { body: string }) => {
  const body = JSON.parse(options.body)
  
  let data
  if (body.key === 'appName') {
    data = {
      "key": "appName",
      "description": "系统名称",
      "value": "monorepo空间配置系统",
      "type": "99",
      "sort": "0",
      "enable": "1",
      "flag": "0",
      "memo": "1"
    }
  }
  if (body.key === 'clientrecordno') {
    data = null
  }
  if (body.key === 'isSignatureCheck') {
    data = null
  }
  if (body.key === 'captchaRequired') {
    data = { "key": "captchaRequired", "description": "是否启用验证码", "value": "0", "type": "99", "sort": "100", "enable": "1", "flag": "0", "memo": "启用验证码，界面显示必须填写验证码，后台进行校验" }
  }

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/admin/captcha', 'post', () => {
  return MockJs.mock({
    code: "200",
    data: { "captchaId": "f6535810-8415-45ee-9596-5f41f98b0e01", "captcha": "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", "captchaCode": "hf3t" },
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/admin/publicKey', 'post', () => {
  return MockJs.mock({
    code: "200",
    data: { "publicKey": "0442a93409103e9446ce59b2b2ab710b404844137782d27784d3888e5ee7d887119f694c696411a80c3db829bd709d0803a206088b8cad5c2c9437b85e18bdd287", "symmetricKey": "04EB6AA747877A895DDD8C934F607A5019CACC052834FBC1751352F5AD6C2B3207CC803DD87507E89C16BA4B9E98200DEBBF35775F6C21607D88BC3F72148A468F36333A157E73283A75E9E680A63871396FD892E5BFD9A6CBA161D3904B0FB19891159C3D5647B34E7D5CA0985B71C6D8" },
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/admin/login', 'post', (options: { body: string }) => {
  const body = JSON.parse(options.body)
  return MockJs.mock({
    code: "200",
    data: { "id": 3, "userId": "test", "loginCode": body.loginCode, "password": "", "salt": "qif_test", "email": null, "phone": null, "name": "测试账号", "nickName": "测试账号", "employeeId": "test_employee_id", "loginEnable": 1, "createDate": 1637061933000, "createBy": "admin", "modifyDate": 1676534400036, "modifyBy": null, "loginX": null, "loginY": null, "loginLocation": "", "loginIp": "172.26.3.134", "loginMachine": "", "loginDate": 1678069025149, "loginStatus": 0, "errorCount": 0, "errorEnableDate": 0, "passwordModifyDate": 1654479384000, "effectivePeriod": null, "orderNo": 9999, "flag": 1, "memo": "测试账号用户", "cryptType": 2, "recvMsgFlag": null, "gesturePassword": null, "gestureSalt": null, "signaturePrivate": "", "signaturePublic": null, "summary": "", "roleIds": null, "employeeName": null, "roleEntities": [], "isWeakPassword": null, "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJlbXBsb3llZU5hbWUiOm51bGwsImxvZ2luQ29kZSI6InRlc3QiLCJlbXBsb3llZUlkIjoidGVzdF9lbXBsb3llZV9pZCIsInVzZXJOYW1lIjoi5rWL6K-V6LSm5Y-3IiwiZXhwIjoxNzcyNzAxNjc3LCJ1c2VySWQiOiJ0ZXN0In0.8c6ffF5jkbkj0kDeBxh8FjkPHIdGB8r2tt52t6ER7lWePlox_KAn1wQUNEzkTFRDpK65KGZcmXcbydzkINuNhA", "passModifyFlag": 0, "employeePhone": null, "employeeSex": null, "idCard": null, "birthDay": null, "homeAddress": null, "address": null, "photo": null, "position": null, "staffNo": null, "education": null, "profession": null, "employeeEmail": null, "qq": null, "vcName": null, "deptName": null, "rootOrgId": null, "rootOrgName": null, "signature": null },
    success: true
  })
})

MockJs.mock('/admin/permission/userLoginMenu', 'post', (options: { body: string }) => {
  const body = JSON.parse(options.body)
  console.log(body, 'body');

  let data: any[];
  if (body.name === 'admin') {
    data = [{
      path: 'admin',
      name: 'admin',
      meta: {
        title: '权限管理',
        icon: 'icon-quanxianguanli',
      },
      children: [],
    }]
  } else if (body.name === 'audit') {
    data = [{
      path: 'audit-manage',
      name: 'audit-manage',
      meta: {
        icon: 'icon-shenjiguanli',
        title: '审计管理',
      },
      children: [],
    }]
  } else {
    data = [{
      path: 'service-root',
      name: 'service-root',
      meta: {
        title: '业务模块',
      },
      children: [],
    }]
  }
  return MockJs.mock({
    code: "200",
    data,
    success: true
  })
})

MockJs.mock('/admin/admin/logout', 'post', () => {
  let data = null

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/user/changePassword', 'post', () => {
  let data = null

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/operate/token', 'post', () => {
  let data = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJlbXBsb3llZU5hbWUiOm51bGwsImxvZ2luQ29kZSI6InRlc3QiLCJlbXBsb3llZUlkIjoidGVzdF9lbXBsb3llZV9pZCIsInVzZXJOYW1lIjoi5rWL6K-V6LSm5Y-3IiwiZXhwIjoxNzcyNzAxNjc3LCJ1c2VySWQiOiJ0ZXN0In0.8c6ffF5jkbkj0kDeBxh8FjkPHIdGB8r2tt52t6ER7lWePlox_KAn1wQUNEzkTFRDpK65KGZcmXcbydzkINuNhA'

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/admin/validateLogin', 'post', () => {
  let data = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJlbXBsb3llZU5hbWUiOm51bGwsImxvZ2luQ29kZSI6InRlc3QiLCJlbXBsb3llZUlkIjoidGVzdF9lbXBsb3llZV9pZCIsInVzZXJOYW1lIjoi5rWL6K-V6LSm5Y-3IiwiZXhwIjoxNzcyNzAxNjc3LCJ1c2VySWQiOiJ0ZXN0In0.8c6ffF5jkbkj0kDeBxh8FjkPHIdGB8r2tt52t6ER7lWePlox_KAn1wQUNEzkTFRDpK65KGZcmXcbydzkINuNhA'

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})
