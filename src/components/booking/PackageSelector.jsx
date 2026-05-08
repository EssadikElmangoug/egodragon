import { experience, RATE_PER_WEEK } from '../../data/packages'

export default function InclusionCard() {
  return (
    <div className="inclusion-card">
      <div className="inclusion-header">
        <div className="inclusion-emblem">☯</div>
        <div className="inclusion-header-text">
          <h3>{experience.name}</h3>
          <p>All services included · <strong>${RATE_PER_WEEK}/person/week</strong> · Min. 7 nights</p>
        </div>
      </div>
      <div className="inclusion-grid">
        {experience.included.map(item => (
          <div className="inclusion-item" key={item}>
            <i className="fas fa-check" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
