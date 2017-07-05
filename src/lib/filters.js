export default {
  currency: function (value = 0, dot = 2, suffix = ' 元') {
    let r = +value
    if (isNaN(r)) {
      r = 0
    }
    const pow = Math.pow(10, dot)
    r = '' + ~~(r * pow) / pow
    if (dot === 0) {
      return r + suffix
    }
    let rs = r.indexOf('.')
    if (rs < 0) {
      rs = r.length
      r += '.'
    }
    rs += dot
    while (r.length <= rs) {
      r += '0'
    }
    return r + suffix
  },
  dateFormat: function (value = new Date(), fmt = 'yyyy-MM-dd hh:mm') {
    value = new Date(value)
    const o = {
      'M+': value.getMonth() + 1,
      'd+': value.getDate(),
      'h+': value.getHours(),
      'm+': value.getMinutes(),
      's+': value.getSeconds(),
      'q+': ~~((value.getMonth() + 3) / 3),
      'S': value.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (value.getFullYear() + '')
        .substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
          ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
