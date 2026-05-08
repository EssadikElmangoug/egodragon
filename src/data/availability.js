// Periods when association is fully booked (YYYY-MM-DD)
export const blockedRanges = [
  { start: '2026-05-18', end: '2026-05-31', label: 'Fully booked' },
  { start: '2026-06-10', end: '2026-06-24', label: 'Fully booked' },
  { start: '2026-07-20', end: '2026-08-20', label: 'Summer intensive' },
  { start: '2026-09-05', end: '2026-09-18', label: 'Fully booked' },
  { start: '2026-10-01', end: '2026-10-14', label: 'Fully booked' },
  { start: '2026-12-20', end: '2027-01-06', label: 'Holiday closure' },
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
