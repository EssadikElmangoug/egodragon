import { Link } from 'react-router-dom'
import { packages } from '../data/packages'

export default function Packages() {
  return (
    <section className="section packages" id="packages">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Your Journey</div>
          <h2 className="section-title">Choose Your Path</h2>
          <p className="section-desc">
            Each package is a door to transformation. Minimum stay 1 week.
            All packages include full board and accommodation.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map(pkg => (
            <div className={`package-card${pkg.featured ? ' featured' : ''}`} key={pkg.id}>
              {pkg.featured && <div className="package-badge">Most Popular</div>}

              <div className="package-header">
                <span className="package-emoji">{pkg.emoji}</span>
                <h3 className="package-name">{pkg.name}</h3>
                <div className="package-duration">{pkg.duration} · {pkg.nights} Nights</div>
                <div className="package-price">
                  <span className="price-amount">€{pkg.price.toLocaleString()}</span>
                  <span className="price-per">per person</span>
                </div>
              </div>

              <ul className="package-features">
                {pkg.included.map(f => (
                  <li key={f} className="included">
                    <i className="fas fa-check check" />
                    {f}
                  </li>
                ))}
                {pkg.notIncluded.map(f => (
                  <li key={f}>
                    <i className="fas fa-times cross" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="package-footer">
                <Link to={`/booking?pack=${pkg.id}`} className={pkg.featured ? 'btn btn-primary' : 'btn btn-outline'}>
                  Book {pkg.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="packages-note">
          <i className="fas fa-info-circle" style={{ marginRight: 6, color: 'var(--gold)' }} />
          All prices per person. Custom durations and group rates available — contact us directly.
        </p>
      </div>
    </section>
  )
}
