import { useState } from 'react'

const methods = [
  { id: 'card', icon: '💳', label: 'Credit Card' },
  { id: 'transfer', icon: '🏦', label: 'Bank Transfer' },
  { id: 'paypal', icon: '🅿️', label: 'PayPal' },
]

export default function PaymentForm({ data, onChange, summary }) {
  const [method, setMethod] = useState(data.method || 'card')

  const set = (field, value) => onChange({ ...data, [field]: value })
  const setM = (m) => { setMethod(m); set('method', m) }

  return (
    <div>
      <div className="form-section-title">Review & Payment</div>

      <div className="review-summary-box">
        <div className="review-row"><span>Package</span><strong>{summary.packageName}</strong></div>
        <div className="review-row"><span>Check-in</span><strong>{summary.checkIn}</strong></div>
        <div className="review-row"><span>Check-out</span><strong>{summary.checkOut}</strong></div>
        <div className="review-row"><span>Duration</span><strong>{summary.nights} nights</strong></div>
        <div className="review-row"><span>Guests</span><strong>{summary.guests}</strong></div>
        <div className="review-row total">
          <span>Total</span>
          <strong className="review-total-amount">€{summary.total.toLocaleString()}</strong>
        </div>
      </div>

      <div className="form-section-title" style={{ marginTop: 32 }}>Payment Method</div>
      <div className="payment-methods">
        {methods.map(m => (
          <div
            key={m.id}
            className={`payment-method${method === m.id ? ' selected' : ''}`}
            onClick={() => setM(m.id)}
          >
            <div className="payment-method-icon">{m.icon}</div>
            <div className="payment-method-label">{m.label}</div>
          </div>
        ))}
      </div>

      {method === 'card' && (
        <div className="card-fields">
          <div className="form-field full" style={{ marginBottom: 12 }}>
            <label>Cardholder Name</label>
            <input type="text" placeholder="As it appears on card" value={data.cardName || ''} onChange={e => set('cardName', e.target.value)} />
          </div>
          <div className="form-field full" style={{ marginBottom: 12 }}>
            <label>Card Number</label>
            <input type="text" placeholder="•••• •••• •••• ••••" maxLength={19} value={data.cardNumber || ''} onChange={e => set('cardNumber', e.target.value)} />
          </div>
          <div className="card-row">
            <div className="form-field">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM / YY" maxLength={7} value={data.expiry || ''} onChange={e => set('expiry', e.target.value)} />
            </div>
            <div className="form-field">
              <label>CVC</label>
              <input type="text" placeholder="•••" maxLength={4} value={data.cvc || ''} onChange={e => set('cvc', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {method === 'transfer' && (
        <div className="transfer-info">
          <p>After submitting, you will receive our bank details by email.</p>
          <p>Your booking is reserved for <strong>72 hours</strong> pending payment.</p>
        </div>
      )}

      {method === 'paypal' && (
        <div className="transfer-info">
          <p>You will be redirected to PayPal to complete payment after submission.</p>
        </div>
      )}

      <div className="secure-note">
        <i className="fas fa-shield-alt" style={{ color: 'var(--green)' }} />
        Secure 256-bit SSL encrypted payment. We never store your card details.
      </div>

      <div className="terms-check">
        <label className="terms-label">
          <input
            type="checkbox"
            checked={data.terms || false}
            onChange={e => set('terms', e.target.checked)}
          />
          I agree to the <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a> and{' '}
          <a href="#" onClick={e => e.preventDefault()}>Cancellation Policy</a>.
          Free cancellation up to 14 days before arrival.
        </label>
      </div>
    </div>
  )
}
