import { useState } from 'react'
import { Link } from 'react-router-dom'

const STARS = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 85}%`,
  size: `${Math.random() * 2.5 + 0.5}px`,
  delay: `${Math.random() * 5}s`,
  duration: `${Math.random() * 3 + 2}s`,
  opacity: Math.random() * 0.7 + 0.3,
}))

export default function Hero() {
  const [stars] = useState(STARS)

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero">
      <div className="stars-container">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <div className="hero-glow" />

      <div className="hero-emblem">
        <div className="emblem-ring outer" />
        <div className="emblem-ring mid" />
        <div className="emblem-core">☯</div>
      </div>

      <div className="hero-mountain" />

      <div className="hero-content">
        <div className="hero-badge">Igo Dragon Association · Ouarzazate, Morocco</div>
        <h1 className="hero-title">
          The Greatest Victory
          <br />
          <em>Is Over Oneself</em>
        </h1>
        <p className="hero-subtitle">
          A sanctuary of inner transformation in the Saharan highlands.
          Martial arts, meditation, nature, and complete digital detox —
          under the most magnificent skies on Earth.
        </p>
        <div className="hero-ctas">
          <Link to="/booking" className="btn btn-primary btn-large">Begin Your Journey</Link>
          <button className="btn btn-outline btn-large" onClick={() => scrollTo('about')}>
            Discover More
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="num">200+</span>
            <span className="label">Lives Transformed</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="num">7+</span>
            <span className="label">Years of Practice</span>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <span className="num">8</span>
            <span className="label">Max Guests</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
