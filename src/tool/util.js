/**
 * Created by nirr on 2019/2/12.
 */
export function copy (obj) {
  const type = Object.prototype.toString.call(obj)
  let val
  if (type === '[object Array]') {
    val = []
    for (let i in obj) val[i] = copy(obj[i])
  } else if (type === '[object Object]') {
    val = {}
    for (let i in obj) val[i] = copy(obj[i])
  } else {
    val = obj
  }
  return val
}

export const util = {
  isMobile (mobile) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(mobile)
  },
  passwordValid (value) {
    return /^(?=.*\d)[a-zA-Z\d]{6,18}$/.test(value)
  },
  smsValid (value) {
    return /^\d{6}$/.test(value)
  },
  identityValid (value) {
    return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value)
  },
  isBank (value) {
    return /^[\d\s]+$/.test(value)
  },
  isNull (value) {
    return /\S/.test(value)
  },
  isPositive (value) {
    return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)
  },
  isName (value) {
    return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(value)
  },
  getWeekDay (timestamp) {
    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weeks[new Date(timestamp * 1000).getDay()]
  },
  isNumberS (val) {
    return /^\d{1,10}$/.test(val)
  }
}
