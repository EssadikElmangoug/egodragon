import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PackageSelector from '../components/booking/PackageSelector'
import DateRangePicker from '../components/booking/DateRangePicker'
import GuestForm from '../components/booking/GuestForm'
import PaymentForm from '../components/booking/PaymentForm'
import Confirmation from '../components/booking/Confirmation'
import { getPackageById } from '../data/packages'
import { isRangeAvailable } from '../data/availability'

const STEPS = ['Package & Dates', 'Guest Info', 'Review & Pay', 'Confirmation']

const genRef = () => `EGD-${Date.now().toString(36).toUpperCase().slice(-6)}`

const fmt = (d) => d
  ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  : '—'

const nights = (cin, cout) => cin && cout
  ? Math.round((new Date(cout) - new Date(cin)) / 86400000)
  : 0

export default function Booking() {
  const [params] = useSearchParams()
  const [step, setStep] = useState(1)
  const [bookingRef] = useState(genRef)

  const [selected, setSelected] = useState(params.get('pack') || 'dragon')
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guestData, setGuestData] = useState({ guests: 1 })
  const [payData, setPayData] = useState({})

  const pkg = getPackageById(selected)
  const n = nights(checkIn, checkOut)
  const pricePerNight = pkg.price / pkg.nights
  const total = Math.round(n > 0 ? pricePerNight * n * (guestData.guests || 1) : pkg.price * (guestData.guests || 1))

  const summary = {
    packageName: pkg.name,
    checkIn: fmt(checkIn),
    checkOut: fmt(checkOut),
    nights: n || pkg.nights,
    guests: guestData.guests || 1,
    total,
    guestName: `${guestData.firstName || ''} ${guestData.lastName || ''}`.trim() || 'Guest',
  }

  const canNext = () => {
    if (step === 1) {
      if (!checkIn || !checkOut) return false
      if (!isRangeAvailable(checkIn, checkOut)) return false
      return true
    }
    if (step === 2) {
      return !!(guestData.firstName && guestData.lastName && guestData.email && guestData.country)
    }
    if (step === 3) {
      return !!payData.terms
    }
    return true
  }

  const next = () => setStep(s => Math.min(s + 1, 4))
  const back = () => setStep(s => Math.max(s - 1, 1))

  return (
    <div className="booking-page">
      <div className="booking-hero">
        <div className="container">
          <div className="section-label">Reserve Your Experience</div>
          <h1>Book Your Retreat</h1>
          <p>Check availability, select your dates, and secure your place.</p>
        </div>
      </div>

      {step < 4 && (
        <div className="steps-bar">
          {STEPS.slice(0, 3).map((label, i) => {
            const num = i + 1
            const isDone = step > num
            const isActive = step === num
            return (
              <div key={label} className={`step-item${isDone ? ' done' : ''}${isActive ? ' active' : ''}`}>
                <div className="step-num">{isDone ? '✓' : num}</div>
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
                <PackageSelector selected={selected} onChange={setSelected} />
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
              <button
                className="btn btn-primary"
                onClick={next}
                disabled={!canNext()}
              >
                {step === 3 ? 'Confirm & Pay →' : 'Continue →'}
              </button>
            </div>
          </div>

          <aside className="booking-sidebar">
            <div className="summary-card">
              <h3>Booking Summary</h3>
              <div className="summary-row">
                <span className="label">Package</span>
                <span className="value">{pkg.emoji} {pkg.name}</span>
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
                <span className="value">{n > 0 ? n : pkg.nights}</span>
              </div>
              <div className="summary-row">
                <span className="label">Guests</span>
                <span className="value">{guestData.guests || 1}</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-total">
                <span className="label">Total</span>
                <span className="amount">€{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="summary-card" style={{ fontSize: '0.82rem' }}>
              <h3>What's Included</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pkg.included.slice(0, 5).map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, color: 'var(--text-muted)', alignItems: 'flex-start' }}>
                    <i className="fas fa-check" style={{ color: 'var(--green)', marginTop: 3, flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
                {pkg.included.length > 5 && (
                  <li style={{ color: 'var(--text-dim)' }}>+{pkg.included.length - 5} more included…</li>
                )}
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
