import '../src/site/styles/base.css'
import '../src/site/styles/chrome.css'
import '../src/site/styles/pages.css'
import Link from 'next/link'
import { fontVariables } from '../src/site/fonts.js'

export const metadata = {
  title: '404 — Page not found | Fenley Menelas',
  description: 'This page does not exist. Back to Fenley Menelas — custom websites in English, Spanish and French.',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <div className="site">
          <header className="nav-wrap">
            <nav className="nav container" aria-label="Primary">
              <Link className="brand" href="/" aria-label="Fenley Menelas — home">
                <span className="brand-mark">FM</span>
                <span className="brand-name">Fenley Menelas</span>
              </Link>
            </nav>
          </header>

          <main id="main">
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
                  Services &amp; pricing
                </Link>
              </div>
            </section>
          </main>
        </div>
      </body>
    </html>
  )
}
