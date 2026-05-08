import { useState } from 'react'

const countries = [
  'Morocco', 'France', 'Spain', 'Germany', 'United Kingdom', 'United States',
  'Canada', 'Netherlands', 'Belgium', 'Italy', 'Portugal', 'Switzerland',
  'Sweden', 'Norway', 'Denmark', 'Australia', 'Japan', 'Other',
]

export default function GuestForm({ data, onChange }) {
  const [errors, setErrors] = useState({})

  const set = (field, value) => {
    onChange({ ...data, [field]: value })
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  const field = (id, label, type = 'text', placeholder = '', full = false) => (
    <div className={`form-field${full ? ' full' : ''}${errors[id] ? ' error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={data[id] || ''}
        onChange={e => set(id, e.target.value)}
      />
      {errors[id] && <span className="field-error">{errors[id]}</span>}
    </div>
  )

  return (
    <div>
      <div className="form-section-title">Your Information</div>

      <div className="form-grid">
        {field('firstName', 'First Name', 'text', 'Ahmed')}
        {field('lastName', 'Last Name', 'text', 'El Mansouri')}
        {field('email', 'Email Address', 'email', 'you@example.com')}
        {field('phone', 'Phone / WhatsApp', 'tel', '+212 6 00 00 00 00')}

        <div className="form-field">
          <label htmlFor="country">Country of Residence</label>
          <select id="country" value={data.country || ''} onChange={e => set('country', e.target.value)}>
            <option value="" disabled>Select country…</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label>Number of Guests</label>
          <div className="guest-count">
            <button
              type="button"
              onClick={() => set('guests', Math.max(1, (data.guests || 1) - 1))}
              disabled={(data.guests || 1) <= 1}
            >−</button>
            <span className="guest-count-num">{data.guests || 1}</span>
            <button
              type="button"
              onClick={() => set('guests', Math.min(8, (data.guests || 1) + 1))}
              disabled={(data.guests || 1) >= 8}
            >+</button>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>Max 8 guests per booking</span>
        </div>

        <div className="form-field full">
          <label htmlFor="notes">Special Requirements or Medical Notes <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>(optional)</span></label>
          <textarea
            id="notes"
            placeholder="Dietary restrictions, medical conditions, specific goals, reason for stay…"
            value={data.notes || ''}
            onChange={e => set('notes', e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="form-note">
        <i className="fas fa-lock" style={{ color: 'var(--gold)', marginRight: 6 }} />
        All personal information is kept strictly confidential and never shared with third parties.
      </div>
    </div>
  )
}
