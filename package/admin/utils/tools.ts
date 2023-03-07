/**
 * 导出 主体方法
 */
export const exportExcel = (data: any, str: any) => {
  if (!data)
    return
  const content = data
  const blob = new Blob([content])
  const fileName = str
  const a = document.createElement('a')
  if ('download' in a) {
    // 非IE下载
    const elink = a
    const url = window.URL.createObjectURL(blob)
    elink.setAttribute('href', url)
    elink.setAttribute('download', fileName)
    elink.style.display = 'none'
    elink.click()
    // URL.revokeObjectURL(url)
  }
  else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
