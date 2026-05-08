// Only genuine closure periods — everything else is open and bookable
export const blockedRanges = [
  { start: '2026-08-10', end: '2026-08-24', label: 'Summer intensive — closed to new bookings' },
  { start: '2026-12-25', end: '2027-01-03', label: 'Holiday closure' },
]

const toMidnight = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export const isDateBlocked = (date) => {
  const d = toMidnight(date)
  return blockedRanges.some(range => {
    const s = toMidnight(range.start)
    const e = toMidnight(range.end)
    return d >= s && d <= e
  })
}

export const isRangeAvailable = (startDate, endDate) => {
  const cur = toMidnight(startDate)
  const end = toMidnight(endDate)
  while (cur <= end) {
    if (isDateBlocked(cur)) return false
    cur.setDate(cur.getDate() + 1)
  }
  return true
}
