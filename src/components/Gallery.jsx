const items = [
  { label: 'Dawn Kung Fu Training', bg: 'linear-gradient(135deg, #1a0a00 0%, #8B3A1A 100%)', large: true },
  { label: 'Starlight Meditation', bg: 'linear-gradient(135deg, #0A1628 0%, #1F3A5F 100%)' },
  { label: 'Oasis Yoga Session', bg: 'linear-gradient(135deg, #0D2B0D 0%, #2A5C45 100%)' },
  { label: 'Traditional Moroccan Meals', bg: 'linear-gradient(135deg, #2B1A00 0%, #6B4C20 100%)' },
  { label: 'Sunset Tai Chi', bg: 'linear-gradient(135deg, #1A0808 0%, #8B2020 100%)', tall: true },
  { label: 'Desert Wild Camp', bg: 'linear-gradient(135deg, #001A2B 0%, #0D4A6B 100%)' },
  { label: 'Oasis Trek', bg: 'linear-gradient(135deg, #1A1200 0%, #4A3A00 100%)' },
]

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-header">
          <div className="section-label">The Experience</div>
          <h2 className="section-title">Life Inside Igo Dragon</h2>
        </div>

        <div className="gallery-grid">
          {items.map(item => (
            <div
              key={item.label}
              className={`gallery-item${item.large ? ' large' : ''}${item.tall ? ' tall' : ''}`}
              style={{ background: item.bg }}
            >
              <div className="gallery-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
