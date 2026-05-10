/** Exact pin — Ave Ibn Sina area (Google Maps embed shows default marker here) */
const PIN_LAT = 30.922710073263275
const PIN_LNG = -6.919061752832745

const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${PIN_LAT},${PIN_LNG}&z=18&hl=en&output=embed`

const MAP_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${PIN_LAT},${PIN_LNG}`

const features = [
  { icon: 'fa-sun', title: '300+ Sunny Days/Year', desc: 'Crystal-clear skies for stargazing and outdoor practice' },
  { icon: 'fa-wind', title: 'Dry Desert Climate', desc: 'Naturally healing, low-humidity sub-Saharan air' },
  { icon: 'fa-tree', title: 'Palm Oasis Valleys', desc: 'Lush oases for meditation, reflection, and swimming' },
  { icon: 'fa-star', title: 'Exceptional Stargazing', desc: 'Some of the darkest skies and most spectacular stars in Africa' },
]

export default function Location() {
  return (
    <section className="section location" id="location">
      <div className="container">
        <div className="location-grid">
          <div className="location-content">
            <div className="section-label">Where We Are</div>
            <h2 className="section-title">Ouarzazate, Morocco</h2>
            <p className="section-lead">The Gateway to the Sahara</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
              Our home sits at the edge of the great Saharan landscape, where the Atlas Mountains
              meet desert plains and ancient oases breathe with life. Ouarzazate — called "The
              Door of the Desert" — offers one of Earth's most transformative environments.
            </p>
            <div className="location-features">
              {features.map(f => (
                <div className="loc-feature" key={f.title}>
                  <div className="loc-feature-icon">
                    <i className={`fas ${f.icon}`} />
                  </div>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="location-visual">
            <div className="location-map location-map-embed">
              <iframe
                title="Map — Ave Ibn Sina, Ouarzazate"
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="location-address-caption">
              <p className="location-address-line">Ave Ibn Sina</p>
              <p className="location-address-meta">Ouarzazate 45000 · Morocco</p>
              <a className="location-map-link" href={MAP_OPEN_URL} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
