const stories = [
  {
    initial: 'K',
    quote: 'I arrived broken by addiction, unable to look at myself in the mirror. Three months with Ego Dragon taught me to fight — not others, but the demons within. Today I run my own business and mentor others.',
    name: 'K., 34',
    context: 'Drug addiction recovery · Phoenix Rising',
    featured: false,
  },
  {
    initial: 'S',
    quote: 'The silence was the first shock. No phone, no social media, no noise. Just me and the stars. By day three, something shifted. I cried for the first time in years. By week two, I felt reborn.',
    name: 'S., 28',
    context: 'Burnout & depression · Dragon\'s Path',
    featured: true,
  },
  {
    initial: 'M',
    quote: 'My family had given up on me. Ego Dragon didn\'t. The Kung Fu sessions gave me structure. The meditation gave me peace. The family here gave me love. I am alive today because of this place.',
    name: 'M., 22',
    context: 'Suicide attempt survivor · Phoenix Rising',
    featured: false,
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Real Transformations</div>
          <h2 className="section-title">They Conquered Themselves</h2>
          <p className="section-desc">
            Names and personal details are protected. These are real stories from people
            who walked through our doors.
          </p>
        </div>

        <div className="testimonials-grid">
          {stories.map(s => (
            <div className={`testimonial-card${s.featured ? ' featured' : ''}`} key={s.name}>
              <div className="testimonial-avatar">{s.initial}</div>
              <p className="testimonial-text">"{s.quote}"</p>
              <div className="testimonial-name">{s.name}</div>
              <div className="testimonial-tag">{s.context}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
