import { useState } from 'react'
import InclusionCard from '../components/booking/PackageSelector'
import DateRangePicker from '../components/booking/DateRangePicker'
import GuestForm from '../components/booking/GuestForm'
import PaymentForm from '../components/booking/PaymentForm'
import Confirmation from '../components/booking/Confirmation'
import { experience, RATE_PER_WEEK, calcTotal } from '../data/packages'
import { isRangeAvailable } from '../data/availability'

const STEPS = ['Your Dates', 'Guest Info', 'Review & Pay']

const genRef = () => `IGD-${Date.now().toString(36).toUpperCase().slice(-6)}`

const fmt = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  : '—'

const countNights = (cin, cout) => cin && cout
  ? Math.round((new Date(cout) - new Date(cin)) / 86400000)
  : 0

export default function Booking() {
  const [step, setStep] = useState(1)
  const [bookingRef] = useState(genRef)

  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guestData, setGuestData] = useState({ guests: 1 })
  const [payData, setPayData] = useState({})

  const nights = countNights(checkIn, checkOut)
  const guests = guestData.guests || 1
  const total = calcTotal(nights, guests)

  const summary = {
    packageName: experience.name,
    checkIn: fmt(checkIn),
    checkOut: fmt(checkOut),
    nights: nights || 7,
    guests,
    total: total || RATE_PER_WEEK * guests,
    guestName: `${guestData.firstName || ''} ${guestData.lastName || ''}`.trim() || 'Guest',
  }

  const canNext = () => {
    if (step === 1) return !!(checkIn && checkOut && nights >= 7 && isRangeAvailable(checkIn, checkOut))
    if (step === 2) return !!(guestData.firstName && guestData.lastName && guestData.email && guestData.country)
    if (step === 3) return !!payData.terms
    return true
  }

  const next = () => setStep(s => Math.min(s + 1, 4))
  const back = () => setStep(s => Math.max(s - 1, 1))

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="container">
          <div className="section-label">Reserve Your Place</div>
          <h1>Book Your Retreat</h1>
          <p>Select your dates and secure your all-inclusive experience.</p>
        </div>
      </div>

      {step < 4 && (
        <div className="steps-bar">
          {STEPS.map((label, i) => {
            const num = i + 1
            return (
              <div key={label} className={`step-item${step > num ? ' done' : ''}${step === num ? ' active' : ''}`}>
                <div className="step-num">{step > num ? '✓' : num}</div>
                <div className="step-label">{label}</div>
              </div>
            )
          })}
        </div>
      )}

      {step < 4 ? (
        <div className="booking-layout">
          <div className="booking-main">
            {step === 1 && (
              <>
                <InclusionCard />
                <DateRangePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onChange={({ checkIn: ci, checkOut: co }) => { setCheckIn(ci); setCheckOut(co) }}
                  minStay={7}
                />
              </>
            )}
            {step === 2 && <GuestForm data={guestData} onChange={setGuestData} />}
            {step === 3 && <PaymentForm data={payData} onChange={setPayData} summary={summary} />}

            <div className="step-nav">
              {step > 1
                ? <button className="btn btn-outline" onClick={back}>← Back</button>
                : <span />
              }
              <button className="btn btn-primary" onClick={next} disabled={!canNext()}>
                {step === 3 ? 'Confirm & Pay →' : 'Continue →'}
              </button>
            </div>
          </div>

          <aside className="booking-sidebar">
            <div className="summary-card">
              <h3>Booking Summary</h3>
              <div className="summary-row">
                <span className="label">Experience</span>
                <span className="value">☯ All-Inclusive</span>
              </div>
              <div className="summary-row">
                <span className="label">Check-In</span>
                <span className="value">{fmt(checkIn)}</span>
              </div>
              <div className="summary-row">
                <span className="label">Check-Out</span>
                <span className="value">{fmt(checkOut)}</span>
              </div>
              <div className="summary-row">
                <span className="label">Nights</span>
                <span className="value">{nights > 0 ? nights : '—'}</span>
              </div>
              <div className="summary-row">
                <span className="label">Guests</span>
                <span className="value">{guests}</span>
              </div>
              {nights > 0 && (
                <div className="summary-row">
                  <span className="label">Rate</span>
                  <span className="value">${RATE_PER_WEEK}/wk × {guests} guest{guests > 1 ? 's' : ''}</span>
                </div>
              )}
              <hr className="summary-divider" />
              <div className="summary-total">
                <span className="label">{nights > 0 ? 'Total' : 'From'}</span>
                <span className="amount">
                  {nights > 0 ? `$${total.toLocaleString()}` : `$${RATE_PER_WEEK.toLocaleString()}`}
                </span>
              </div>
              {nights === 0 && (
                <p style={{ fontSize: '0.72rem', color: 'var(--text-d)', marginTop: 6 }}>
                  for 1 person · 1 week
                </p>
              )}
            </div>

            <div className="summary-card">
              <h3>All Included</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {experience.included.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, color: 'var(--text-m)', alignItems: 'flex-start', fontSize: '0.82rem' }}>
                    <i className="fas fa-check" style={{ color: 'var(--green)', marginTop: 3, flexShrink: 0, fontSize: '0.65rem' }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="trust-badges">
              <div className="trust-badge"><i className="fas fa-undo" /> Free cancellation 14 days prior</div>
              <div className="trust-badge"><i className="fas fa-shield-alt" /> Secure payment</div>
              <div className="trust-badge"><i className="fas fa-envelope" /> Confirmation in minutes</div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="container" style={{ paddingBottom: 80 }}>
          <Confirmation bookingRef={bookingRef} summary={summary} />
        </div>
      )}
    </div>
  )
}
