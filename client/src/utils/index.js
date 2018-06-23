import moment from 'moment'

function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000
  const milliSecondsPerHour = milliSecondsPerMinute * 60
  const milliSecondsPerDay = milliSecondsPerHour * 24
  const milliSecondsPerMonth = milliSecondsPerDay * 30
  const milliSecondsPerYear = milliSecondsPerDay * 365

  const elapsed = current - previous

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now'
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago'
  } else if (elapsed < milliSecondsPerHour) {
    let d = Math.round(elapsed / milliSecondsPerMinute)
    if (d === 1) return d + ' minute ago'
    return d + ' minutes ago'
  } else if (elapsed < milliSecondsPerDay) {
    let d = Math.round(elapsed / milliSecondsPerHour)
    if (d === 1) return d + ' hour ago'
    return d + ' hours ago'
  } else if (elapsed < milliSecondsPerMonth) {
    let d = Math.round(elapsed / milliSecondsPerDay)
    if (d === 1) return d + ' day ago'
    return d + ' days ago'
  } else if (elapsed < milliSecondsPerYear) {
    let d = Math.round(elapsed / milliSecondsPerMonth)
    if (d === 1) return d + ' month ago'
    return d + ' months ago'
  } else {
    let d = Math.round(elapsed / milliSecondsPerYear)
    if (d === 1) return d + ' year ago'
    return d + ' years ago'
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}

export const reverseFormat = string => {
  const array = string.split(':')
  if (array.length === 3) {
    return (
      parseInt(array[0], 10) * 3600 +
      parseInt(array[1], 10) * 60 +
      parseInt(array[2], 10)
    )
  }
  if (array.length === 2)
    return parseInt(array[0], 10) * 60 + parseInt(array[1], 10)
}

export const formatTime = secs => {
  const formatted = moment.utc(secs * 1000).format('H:mm:ss')
  if (secs < 600) return formatted.slice(3)
  if (secs < 3600) return formatted.slice(2)
  return formatted
}

export const setNewVideoTag = date => {
  //const createdOn = moment(date)
  const testDate = moment()
    .subtract(2, 'weeks')
    .utc()
    .valueOf()
  return date > testDate
}
