import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Activities from '../components/Activities'
import Packages from '../components/Packages'
import Location from '../components/Location'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      <section className="philosophy-banner">
        <div className="container">
          <blockquote className="philosophy-quote">
            <span className="quote-mark">"</span>
            The warrior who conquers himself is greater than he who conquers a thousand men in battle.
            <span className="quote-mark">"</span>
          </blockquote>
          <cite className="philosophy-cite">— Ancient Wisdom, Living Practice</cite>
        </div>
      </section>

      <Activities />
      <Packages />
      <Location />
      <Testimonials />
      <Gallery />

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Begin?</h2>
            <p>Your transformation starts with a single decision. Check availability and reserve your place now.</p>
            <div className="cta-actions">
              <Link to="/booking" className="btn btn-primary btn-large">Check Availability & Book</Link>
              <a href="mailto:contact@egodragon.ma" className="btn btn-outline btn-large">Ask a Question</a>
            </div>
            <p className="cta-note">
              Minimum stay: 1 week · Payment required at booking · Free cancellation 14 days before arrival
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
