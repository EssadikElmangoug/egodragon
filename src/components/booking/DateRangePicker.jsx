import { useState } from 'react'
import { isDateBlocked, isRangeAvailable } from '../../data/availability'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

const toMidnight = d => { const x = new Date(d); x.setHours(0,0,0,0); return x }
const sameDay = (a, b) => a && b && toMidnight(a).getTime() === toMidnight(b).getTime()
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x }

function buildGrid(year, month) {
  const first = new Date(year, month, 1).getDay()
  const total = new Date(year, month + 1, 0).getDate()
  const cells = Array(first).fill(null)
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function MonthGrid({ year, month, checkIn, checkOut, hover, onHover, onClick, minStay }) {
  const today = toMidnight(new Date())
  const minOut = checkIn && !checkOut ? addDays(checkIn, minStay) : null
  const cells = buildGrid(year, month)

  const classify = (d) => {
    if (!d) return 'cal-day empty'
    const classes = ['cal-day']
    const dm = toMidnight(d)
    if (dm < today) { classes.push('past'); return classes.join(' ') }
    if (isDateBlocked(d)) { classes.push('blocked'); return classes.join(' ') }
    if (minOut && dm < minOut) { classes.push('unavailable'); return classes.join(' ') }
    if (sameDay(d, checkIn)) classes.push('check-in')
    if (sameDay(d, checkOut)) classes.push('check-out')
    const rangeEnd = checkOut || hover
    if (checkIn && rangeEnd && dm > toMidnight(checkIn) && dm < toMidnight(rangeEnd)) classes.push('in-range')
    return classes.join(' ')
  }

  const canClick = (d) => {
    if (!d) return false
    const dm = toMidnight(d)
    if (dm < today) return false
    if (isDateBlocked(d)) return false
    if (minOut && dm < minOut) return false
    return true
  }

  return (
    <div className="month-cal">
      <div className="month-cal-header">{MONTHS[month]} {year}</div>
      <div className="cal-weekdays-row">
        {DAYS.map(d => <div key={d} className="cal-weekday">{d}</div>)}
      </div>
      <div className="cal-days">
        {cells.map((d, i) => (
          <div
            key={i}
            className={classify(d)}
            onClick={() => canClick(d) && onClick(d)}
            onMouseEnter={() => d && canClick(d) && onHover(d)}
          >
            {d ? d.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DateRangePicker({ checkIn, checkOut, onChange, minStay = 7 }) {
  const now = new Date()
  const [base, setBase] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [hover, setHover] = useState(null)

  const next = new Date(base.getFullYear(), base.getMonth() + 1, 1)
  const canPrev = base > new Date(now.getFullYear(), now.getMonth(), 1)

  const handleClick = (d) => {
    if (!checkIn || (checkIn && checkOut)) {
      onChange({ checkIn: d, checkOut: null })
    } else {
      if (toMidnight(d) >= toMidnight(addDays(checkIn, minStay))) {
        if (isRangeAvailable(checkIn, d)) {
          onChange({ checkIn, checkOut: d })
        }
      }
    }
  }

  const fmt = (d) => d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
  const nights = checkIn && checkOut
    ? Math.round((toMidnight(checkOut) - toMidnight(checkIn)) / 86400000)
    : null

  const rangeOk = checkIn && checkOut ? isRangeAvailable(checkIn, checkOut) : null

  return (
    <div className="date-picker-section">
      <div className="form-section-title">Select Your Dates</div>

      <div className="date-selection-summary">
        <div className={`date-chip${checkIn ? ' set' : ''}`}>
          <span className="date-chip-label">Check-In</span>
          <span className="date-chip-value">{fmt(checkIn)}</span>
        </div>
        <div className="date-chip-arrow">→</div>
        <div className={`date-chip${checkOut ? ' set' : ''}`}>
          <span className="date-chip-label">Check-Out</span>
          <span className="date-chip-value">{fmt(checkOut)}</span>
        </div>
        {nights && (
          <div className="date-chip nights">
            <span className="date-chip-label">Duration</span>
            <span className="date-chip-value">{nights} nights</span>
          </div>
        )}
      </div>

      {!checkIn && (
        <p className="cal-hint">Select your check-in date</p>
      )}
      {checkIn && !checkOut && (
        <p className="cal-hint">Now select check-out (minimum {minStay} nights from check-in)</p>
      )}

      <div className="calendar-nav-row">
        <button className="cal-nav-btn" onClick={() => setBase(b => new Date(b.getFullYear(), b.getMonth() - 1, 1))} disabled={!canPrev}>
          ‹
        </button>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {MONTHS[base.getMonth()]} {base.getFullYear()} — {MONTHS[next.getMonth()]} {next.getFullYear()}
        </span>
        <button className="cal-nav-btn" onClick={() => setBase(b => new Date(b.getFullYear(), b.getMonth() + 1, 1))}>
          ›
        </button>
      </div>

      <div className="calendars-wrapper" onMouseLeave={() => setHover(null)}>
        <MonthGrid
          year={base.getFullYear()} month={base.getMonth()}
          checkIn={checkIn} checkOut={checkOut} hover={hover}
          onHover={setHover} onClick={handleClick} minStay={minStay}
        />
        <MonthGrid
          year={next.getFullYear()} month={next.getMonth()}
          checkIn={checkIn} checkOut={checkOut} hover={hover}
          onHover={setHover} onClick={handleClick} minStay={minStay}
        />
      </div>

      <div className="calendar-legend">
        <div className="cal-legend-item"><span className="legend-dot available" /> Available</div>
        <div className="cal-legend-item"><span className="legend-dot blocked" /> Fully Booked</div>
        <div className="cal-legend-item"><span className="legend-dot selected" /> Your Stay</div>
        <div className="cal-legend-item"><span className="legend-dot range" /> Range</div>
      </div>

      {checkIn && checkOut && rangeOk === false && (
        <div className="availability-status unavailable">
          <i className="fas fa-times-circle" />
          This date range overlaps with a fully booked period. Please choose different dates.
        </div>
      )}
      {checkIn && checkOut && rangeOk === true && (
        <div className="availability-status available">
          <i className="fas fa-check-circle" />
          Great news — this period is available! {nights} nights selected.
        </div>
      )}
      {!checkIn && (
        <div className="availability-status neutral">
          <i className="fas fa-calendar-alt" />
          Click a date to start your selection. Minimum stay is 7 nights.
        </div>
      )}
    </div>
  )
}
