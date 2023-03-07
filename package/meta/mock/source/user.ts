import MockJs from 'mockjs'

MockJs.mock('/admin/employee/self', 'post', () => {
  let data = { "id": 3, "userId": "test", "loginCode": 'body.loginCode', "password": "", "salt": "qif_test", "email": null, "phone": null, "name": "测试账号", "nickName": "测试账号", "employeeId": "test_employee_id", "loginEnable": 1, "createDate": 1637061933000, "createBy": "admin", "modifyDate": 1676534400036, "modifyBy": null, "loginX": null, "loginY": null, "loginLocation": "", "loginIp": "172.26.3.134", "loginMachine": "", "loginDate": 1678069025149, "loginStatus": 0, "errorCount": 0, "errorEnableDate": 0, "passwordModifyDate": 1654479384000, "effectivePeriod": null, "orderNo": 9999, "flag": 1, "memo": "测试账号用户", "cryptType": 2, "recvMsgFlag": null, "gesturePassword": null, "gestureSalt": null, "signaturePrivate": "", "signaturePublic": null, "summary": "", "roleIds": null, "employeeName": null, "roleEntities": [], "isWeakPassword": null, "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJlbXBsb3llZU5hbWUiOm51bGwsImxvZ2luQ29kZSI6InRlc3QiLCJlbXBsb3llZUlkIjoidGVzdF9lbXBsb3llZV9pZCIsInVzZXJOYW1lIjoi5rWL6K-V6LSm5Y-3IiwiZXhwIjoxNzcyNzAxNjc3LCJ1c2VySWQiOiJ0ZXN0In0.8c6ffF5jkbkj0kDeBxh8FjkPHIdGB8r2tt52t6ER7lWePlox_KAn1wQUNEzkTFRDpK65KGZcmXcbydzkINuNhA", "passModifyFlag": 0, "employeePhone": null, "employeeSex": null, "idCard": null, "birthDay": null, "homeAddress": null, "address": null, "photo": null, "position": null, "staffNo": null, "education": null, "profession": null, "employeeEmail": null, "qq": null, "vcName": null, "deptName": null, "rootOrgId": null, "rootOrgName": null, "signature": null }

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/employee/editBySelf', 'post', (options) => {
  const body = JSON.parse(options.body)
  let data = body

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})

MockJs.mock('/admin/employee/uploadPhoto', 'post', () => {
  let data = null

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})
