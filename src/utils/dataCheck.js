// 千分位转化成逗号隔开
export function dataSan(num) {
  if (num == null) {
    return '-'
  }
  if (num === 0) {
    return 0
  }
  return `${num}`.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}
