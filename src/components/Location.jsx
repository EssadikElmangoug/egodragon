const features = [
  { icon: 'fa-sun', title: '300+ Sunny Days/Year', desc: 'Crystal-clear skies for stargazing and outdoor practice' },
  { icon: 'fa-wind', title: 'Dry Desert Climate', desc: 'Naturally healing, low-humidity sub-Saharan air' },
  { icon: 'fa-tree', title: 'Palm Oasis Valleys', desc: 'Lush oases for meditation, reflection, and swimming' },
  { icon: 'fa-star', title: 'Exceptional Stargazing', desc: 'Some of the darkest skies and most spectacular stars in Africa' },
]

const months = [
  { name: 'Jan', cls: 'good' }, { name: 'Feb', cls: 'good' }, { name: 'Mar', cls: 'ideal' },
  { name: 'Apr', cls: 'ideal' }, { name: 'May', cls: 'good' }, { name: 'Jun', cls: 'hot' },
  { name: 'Jul', cls: 'hot' }, { name: 'Aug', cls: 'hot' }, { name: 'Sep', cls: 'good' },
  { name: 'Oct', cls: 'ideal' }, { name: 'Nov', cls: 'ideal' }, { name: 'Dec', cls: 'good' },
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
            <div className="location-map">
              <div className="map-pin">
                <div className="map-pin-icon">📍</div>
                <div className="map-pin-label">Ouarzazate</div>
                <div className="map-pin-coords">30°55′N · 6°54′W · 1160m alt.</div>
              </div>
            </div>

            <div className="climate-card">
              <h4>Best Time to Visit</h4>
              <div className="climate-months">
                {months.map(m => (
                  <div key={m.name} className={`climate-month ${m.cls}`}>{m.name}</div>
                ))}
              </div>
              <div className="climate-legend">
                <span className="ideal">Ideal</span>
                <span className="good">Good</span>
                <span className="hot">Hot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
