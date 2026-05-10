import { Link, useNavigate } from 'react-router-dom'

const explore = ['about', 'activities', 'packages', 'location', 'testimonials']
const experiences = ['Martial Arts', 'Meditation & Yoga', 'Nature Activities', 'Coaching & Rehab', 'Moroccan Food & Culture']

export default function Footer() {
  const navigate = useNavigate()

  const scrollTo = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img
                src="/logo.png"
                alt="Igo Dragon"
                className="logo-img logo-img-footer"
                width={320}
                height={320}
                decoding="async"
              />
            </Link>
            <p>A sanctuary of transformation in the heart of Ouarzazate, Morocco.</p>
            <p className="footer-philosophy">"The greatest victory is over oneself"</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              {explore.map(id => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Experience</h4>
            <ul>
              {experiences.map(e => (
                <li key={e}><a href="#">{e}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt" />
              <span>Ouarzazate, Morocco</span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope" />
              <a href="mailto:contact@egodragon.ma">contact@egodragon.ma</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-phone" />
              <a href="tel:+212600000000">+212 6 00 00 00 00</a>
            </div>
            <div className="footer-social">
              {['instagram', 'facebook', 'youtube'].map(s => (
                <a key={s} href="#" className="social-btn" aria-label={s}>
                  <i className={`fab fa-${s}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Igo Dragon Association · Ouarzazate, Morocco · All rights reserved</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
