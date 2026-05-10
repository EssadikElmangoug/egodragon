import { Link, Navigate, useParams } from 'react-router-dom'
import { getPostBySlug, formatBlogDate } from '../data/blogPosts'
import Footer from '../components/Footer'

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <div className="blog-page blog-post-page">
      <article>
        <header className="booking-hero blog-post-hero">
          <div className="container blog-post-header-inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link to="/blog">Journal</Link>
              <span aria-hidden="true">/</span>
              <span className="blog-breadcrumb-current">{post.title}</span>
            </nav>
            <p className="section-label">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readMinutes} min read</span>
            </div>
          </div>
        </header>

        <div className="container blog-article-body">
          <div className="blog-prose">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <p className="blog-back-wrap">
            <Link to="/blog" className="btn btn-outline">
              ← All posts
            </Link>
          </p>
        </div>
      </article>

      <Footer />
    </div>
  )
}
