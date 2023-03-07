// 时间相关工具集

import moment from 'moment'

import type { MomentInput } from 'moment'

/**
 * @Description 时间戳转年月日
 * @date 2021-06-15
 * @param {any} value:string|number
 * @param {any} formatter="YYYY-MM-DDHH:mm:ss"
 * @returns {any}
 */
export function dateFormat(
  value: string | number,
  formatter = 'YYYY-MM-DD HH:mm:ss',
): string {
  if (value === undefined || value === null)
    return ''

  return moment(value).format(formatter)
}

/**
 * @description 保留一个时间到日期（时分秒归零）
 * @param {[time]} time [时间/时间戳]
 */
export function toADateStamp(time: MomentInput = Date.now()): number {
  return moment(`${moment(time).format('YYYY-MM-DD')} 00:00:00`).valueOf()
}

/**
 * @description: 获取一个时间在当天最后一毫秒的时间戳
 * @param {[time]} time 时间戳
 */
export function toAEndDateStamp(time: MomentInput = Date.now()): number {
  const startStampOfDate: number = toADateStamp(time)
  return startStampOfDate + 86400000 - 1
}

/**
 * @description 格式化时间
 * @param  {[Date, DateString, DateStamp]} time [需要格式化的时间戳、时间字符串]
 * @param  {String} formatter [格式化格式]
 * @return {[DateString]} [格式化之后的时间字符串]
 */
export function format(time: moment.MomentInput, formatter = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(formatter)
}

/**
 * @Description 事件跨度，（当前时间点 - 往前多少天）年月日
 * @date 2022-04-07
 * @param {any} date=moment(
 * @returns {any}
 */
export function dateRanger(date = moment().format(), days = 30) {
  const subtract = moment().subtract(days, 'days').format()
  return [subtract, date]
}

/**
 * @Description 年月日转时间戳
 * @date 2022-04-07
 * @param {any} value:string
 * @returns {any}
 */
export function dateToParse(value: string | Date): number {
  if (!value)
    return null as any
  return +moment(value).format('x')
}

/**
 * @Description 比较两个时间是否大于一个月
 * @date 2021-09-08
 * @param {any} startDate:Date
 * @param {any} endDate:Date
 * @returns {any}
 */
export function compareDate(startDate: Date, endDate: Date): boolean {
  const sDate = new Date(startDate)
  const eDate = new Date(endDate)
  if (eDate.getFullYear() - sDate.getFullYear() > 1) {
    // 先比较年
    return true
  }
  else if (eDate.getMonth() - sDate.getMonth() > 1) {
    // 再比较月
    return true
  }
  else if (eDate.getMonth() - sDate.getMonth() === 1) {
    if (eDate.getDate() - sDate.getDate() >= 0)
      return true
  }
  else if (eDate.getFullYear() - sDate.getFullYear() === 1) {
    if (eDate.getMonth() + 12 - sDate.getMonth() > 1)
      return true
    else if (eDate.getDate() - sDate.getDate() >= 0)
      return true
  }
  return false
}
