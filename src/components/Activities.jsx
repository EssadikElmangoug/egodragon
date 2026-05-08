const activities = [
  {
    icon: 'fa-fist-raised',
    title: 'Martial Arts & Fitness',
    tag: 'Body Mastery',
    items: [
      'Kung Fu — Self-Mastery Through Combat',

      'Wing Chun — Precision & Flow',
      'Aerobics — Energize & Strengthen',
    ],
  },
  {
    icon: 'fa-mountain',
    title: 'Nature & Adventure',
    tag: 'Earth Connection',
    items: [
      'Wild Camping Under Desert Stars',
      'Trekking Through Ouarzazate Valleys',
      'Swimming in Natural Springs & Rivers',
      'Oasis Exploration & Desert Hiking',
    ],
  },
  {
    icon: 'fa-yin-yang',
    title: 'Mind & Spirit',
    tag: 'Inner Stillness',
    items: [
      'Meditation Under Clear Desert Skies',
      'Yoga at Sunrise & Sunset',
      'Tai Chi — The Moving Meditation',
      'Qigong — Life Energy Cultivation',
    ],
  },
  {
    icon: 'fa-leaf',
    title: 'Wellness & Nourishment',
    tag: 'Body Purification',
    items: [
      'Traditional Moroccan Bio Food',
      'Body Cleanse & Detox Programs',
      'Medical Dressage Therapy',
      'Herbal & Natural Remedies',
    ],
  },
  {
    icon: 'fa-heart',
    title: 'Coaching & Rehabilitation',
    tag: 'Soul Healing',
    items: [
      'Personal Life Coaching',
      'Addiction Recovery Support',
      'Mental Health Restoration',
      'Suicide Prevention & Support',
    ],
  },
  {
    icon: 'fa-home',
    title: 'Cultural Immersion',
    tag: 'Deep Roots',
    items: [
      'Authentic Moroccan Family Home Stay',
      'Traditional Life & Simple Living',
      'Moroccan Culture & Traditions',
      'Complete Digital Detox',
    ],
  },
]

export default function Activities() {
  return (
    <section className="section activities" id="activities">
      <div className="container">
        <div className="section-header">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Pillars of Transformation</h2>
          <p className="section-desc">
            Each activity awakens a different dimension of your being — body, mind, and spirit.
          </p>
        </div>

        <div className="activities-grid">
          {activities.map(a => (
            <div className="activity-card" key={a.title}>
              <div className="activity-icon">
                <i className={`fas ${a.icon}`} />
              </div>
              <h3>{a.title}</h3>
              <ul className="activity-list">
                {a.items.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="activity-tag">{a.tag}</div>
            </div>
          ))}
        </div>

        <div className="detox-banner">
          <div className="detox-icons">
            <span className="detox-icon-item"><i className="fas fa-phone" /></span>
            <span className="detox-icon-item"><i className="fas fa-wifi" /></span>
            <span className="detox-icon-item"><i className="fas fa-volume-up" /></span>
          </div>
          <h3>Total Digital Detox</h3>
          <p>No phones. No internet. No noise. Only the sound of wind, water, and your own breathing.</p>
        </div>
      </div>
    </section>
  )
}
