import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section container not-found">
      <p className="kicker">404</p>
      <h1 className="display">Page not found</h1>
      <p className="lead">
        This page does not exist. Head back to the home page, or jump straight to services and pricing.
      </p>
      <div className="hero-actions">
        <Link className="btn btn-primary btn-lg" href="/">
          Back to home
        </Link>
        <Link className="btn btn-ghost btn-lg" href="/services">
          Services & pricing
        </Link>
      </div>
    </section>
  )
}
