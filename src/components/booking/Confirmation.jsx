import { Link } from 'react-router-dom'

const nextSteps = [
  'You\'ll receive a confirmation email with full booking details within minutes.',
  'Our team will reach out within 24 hours to discuss your specific needs and goals.',
  'We\'ll send a preparation guide: what to bring, how to arrive, and what to expect.',
  'On arrival day, a team member will welcome you personally at the association.',
]

export default function Confirmation({ bookingRef, summary }) {
  return (
    <div className="confirmation">
      <div className="confirmation-icon">✓</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 8 }}>
        Booking Confirmed
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 4 }}>Your journey begins here.</p>
      <div className="booking-ref">{bookingRef}</div>

      <div className="confirmation-details">
        <div className="conf-detail-row">
          <span className="conf-detail-label">Package</span>
          <span className="conf-detail-value">{summary.packageName}</span>
        </div>
        <div className="conf-detail-row">
          <span className="conf-detail-label">Guest</span>
          <span className="conf-detail-value">{summary.guestName}</span>
        </div>
        <div className="conf-detail-row">
          <span className="conf-detail-label">Check-In</span>
          <span className="conf-detail-value">{summary.checkIn}</span>
        </div>
        <div className="conf-detail-row">
          <span className="conf-detail-label">Check-Out</span>
          <span className="conf-detail-value">{summary.checkOut}</span>
        </div>
        <div className="conf-detail-row">
          <span className="conf-detail-label">Duration</span>
          <span className="conf-detail-value">{summary.nights} nights</span>
        </div>
        <div className="conf-detail-row">
          <span className="conf-detail-label">Guests</span>
          <span className="conf-detail-value">{summary.guests}</span>
        </div>
        <div className="conf-detail-row">
          <span className="conf-detail-label">Total Paid</span>
          <span className="conf-detail-value" style={{ color: 'var(--gold)', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
            €{summary.total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="next-steps">
        <h4>What Happens Next</h4>
        {nextSteps.map((step, i) => (
          <div className="next-step-item" key={i}>
            <div className="next-step-num">{i + 1}</div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">Return Home</Link>
        <a href="mailto:contact@egodragon.ma" className="btn btn-outline">Contact Us</a>
      </div>

      <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 24 }}>
        Booking reference: {bookingRef} · A confirmation has been sent to your email.
      </p>
    </div>
  )
}
