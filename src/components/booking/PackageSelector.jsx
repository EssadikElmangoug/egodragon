import { packages } from '../../data/packages'

export default function PackageSelector({ selected, onChange }) {
  return (
    <div>
      <div className="form-section-title">Select Your Package</div>
      <div className="pkg-selector-grid">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className={`pkg-option${selected === pkg.id ? ' selected' : ''}`}
            onClick={() => onChange(pkg.id)}
            role="radio"
            aria-checked={selected === pkg.id}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onChange(pkg.id)}
          >
            <div className="pkg-option-radio">
              <div className={`radio-dot${selected === pkg.id ? ' active' : ''}`} />
            </div>
            <span className="pkg-option-emoji">{pkg.emoji}</span>
            <div className="pkg-option-info">
              <div className="pkg-option-name">{pkg.name}</div>
              <div className="pkg-option-duration">{pkg.duration} · Min. {pkg.nights} nights</div>
              <div className="pkg-option-tagline">{pkg.tagline}</div>
            </div>
            <div className="pkg-option-price">
              €{pkg.price.toLocaleString()}
              <span>/person</span>
            </div>
            {pkg.featured && <div className="pkg-option-badge">Popular</div>}
          </div>
        ))}
      </div>
      <div className="min-stay-note">
        <i className="fas fa-info-circle" style={{ color: 'var(--gold)', marginRight: 6 }} />
        Minimum stay is <strong>1 week (7 nights)</strong>. Custom durations are priced per night.
        All packages include full board and accommodation.
      </div>
    </div>
  )
}
