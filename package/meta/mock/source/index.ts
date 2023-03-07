import MockJs from 'mockjs'

MockJs.mock('/admin/version/moduleVersion/getCurrentVersion', 'get', () => {
  let data = {
    versionNum: 'v0.0.1',
    versionSummary: 'describe'
  }

  return MockJs.mock({
    code: "200",
    data,
    msg: "请求成功",
    success: true
  })
})
