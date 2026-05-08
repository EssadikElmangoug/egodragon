import { Link } from 'react-router-dom'
import { experience, RATE_PER_WEEK } from '../data/packages'

const examples = [
  { label: '1 Week', nights: 7,  price: RATE_PER_WEEK },
  { label: '2 Weeks', nights: 14, price: RATE_PER_WEEK * 2, featured: true },
  { label: '1 Month', nights: 28, price: RATE_PER_WEEK * 4 },
]

export default function Packages() {
  return (
    <section className="section packages" id="packages">
      <div className="container">
        <div className="section-header">
          <div className="section-label">One Package</div>
          <h2 className="section-title">Everything Included</h2>
          <p className="section-desc">
            One all-inclusive experience. Every service, every activity, every meal —
            nothing extra. The price changes only based on your stay duration.
          </p>
        </div>

        <div className="single-package">
          <div className="sp-header">
            <div className="sp-emblem">☯</div>
            <h3>{experience.name}</h3>
            <p className="sp-tagline">{experience.tagline}</p>
            <div className="sp-price-row">
              <span className="sp-rate">${RATE_PER_WEEK}</span>
              <span className="sp-unit">per person · per week</span>
            </div>
            <div className="sp-min-stay">Minimum stay: 1 week · 7 nights</div>
          </div>

          <div className="sp-included">
            <h4>What's Included</h4>
            <div className="sp-grid">
              {experience.included.map(item => (
                <div className="sp-item" key={item}>
                  <i className="fas fa-check" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="sp-examples">
            {examples.map(ex => (
              <div key={ex.label} className={`sp-example${ex.featured ? ' featured' : ''}`}>
                {ex.featured && <div className="sp-example-badge">Most Popular</div>}
                <span className="ex-duration">{ex.label}</span>
                <span className="ex-nights">{ex.nights} nights</span>
                <span className="ex-price">${ex.price.toLocaleString()}</span>
                <span className="ex-unit">/person</span>
              </div>
            ))}
          </div>

          <div className="sp-footer">
            <Link to="/booking" className="btn btn-primary btn-large">
              Check Availability & Book
            </Link>
            <p>Free cancellation up to 14 days before arrival · Price prorated on actual nights stayed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
