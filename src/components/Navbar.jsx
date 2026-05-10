import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const scrollTo = (id) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Activities', id: 'activities' },
    { label: 'Packages', id: 'packages' },
    { label: 'Location', id: 'location' },
    { label: 'Stories', id: 'testimonials' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-symbol">☯</span>
          <span className="logo-text">IGO<strong>DRAGON</strong></span>
        </Link>

        <button
          className={`hamburger${open ? ' active' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {navItems.map(({ label, id }) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)}>{label}</button>
            </li>
          ))}
          <li>
            <Link to="/booking" className="nav-cta" onClick={() => setOpen(false)}>
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
