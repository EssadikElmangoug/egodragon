import { Link } from 'react-router-dom'

const values = [
  { icon: '⚔️', title: 'Discipline', desc: 'Through martial arts and structured daily practice' },
  { icon: '🌿', title: 'Purity', desc: 'Clean air, organic food, and natural living' },
  { icon: '🌌', title: 'Presence', desc: 'Full immersion in the now, under open desert skies' },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-img-placeholder">
              <div className="about-img-inner">
                <div className="about-img-icon">🏔️</div>
                <p>Ouarzazate · Morocco</p>
              </div>
              <div className="about-img-overlay" />
            </div>
            <div className="about-badge-card">
              <span className="about-badge-icon">🏅</span>
              <div>
                <strong>Certified</strong>
                <span>Wellness Association</span>
              </div>
            </div>
          </div>

          <div className="about-content">
            <div className="section-label">Who We Are</div>
            <h2 className="section-title">We Are Ego Dragon</h2>
            <p className="section-lead">
              A family-rooted association nestled in the soul of Morocco, where ancient
              wisdom meets transformative healing.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
              Founded in the sun-drenched valleys of Ouarzazate, Ego Dragon exists for one
              purpose: to guide you toward the greatest victory you will ever achieve — victory
              over yourself.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
              We offer immersive experiences where you disconnect from the chaos of modern
              life and reconnect with your deepest self. No phones. No noise. No distractions.
              Just you, the desert sky, and the path inward.
            </p>

            <div className="about-values">
              {values.map(v => (
                <div className="value-item" key={v.title}>
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/booking" className="btn btn-primary">Reserve Your Place</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
