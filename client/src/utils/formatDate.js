export const formatDate = date => {
  const x = new Date(date)
  const m = x.getMonth() + 1
  const d = x.getDay()
  const y = x.getFullYear()
  return `${m < 10 ? '0' + m : m}/${d < 10 ? '0' + d : d}/${y}`
}
