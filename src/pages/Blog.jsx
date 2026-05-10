import { Link } from 'react-router-dom'
import { blogPosts, formatBlogDate } from '../data/blogPosts'
import Footer from '../components/Footer'

export default function Blog() {
  return (
    <div className="blog-page">
      <header className="booking-hero blog-hero">
        <div className="container">
          <p className="section-label">Journal</p>
          <h1>Stories from the retreat</h1>
          <p>Notes on training, recovery, and life at Igo Dragon — updated when we have something worth saying.</p>
        </div>
      </header>

      <section className="section blog-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card-meta">
                  <span className="blog-card-cat">{post.category}</span>
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                </div>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-footer">
                  <span className="blog-read-time">{post.readMinutes} min read</span>
                  <Link to={`/blog/${post.slug}`} className="blog-read-more">
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
