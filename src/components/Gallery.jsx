import { demoGallery } from '../data/demoImages'

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section-header">
          <div className="section-label">The Experience</div>
          <h2 className="section-title">Life Inside Igo Dragon</h2>
        </div>

        <div className="gallery-grid">
          {demoGallery.map(item => (
            <div
              key={item.label}
              className={`gallery-item${item.large ? ' large' : ''}${item.tall ? ' tall' : ''}`}
            >
              <img
                className="gallery-photo"
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <div className="gallery-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
