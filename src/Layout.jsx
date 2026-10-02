'use client'
import { useEffect, useState } from 'react'
import { Link, NavLink, PlainLink } from './router.jsx'
import { useLocation } from './navigation.js'
import { useI18n } from './useI18n.js'
import { useReveal } from './hooks.js'
import { CTABand, BrandLink } from './components.jsx'
import { DustCanvas } from './Dust.jsx'
import { localize, stripLocale } from './seo.js'

const PAGES = [
  { to: '/', key: 'home', end: true },
  { to: '/services', key: 'services' },
  { to: '/build', key: 'build' },
  { to: '/skills', key: 'skills' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
]

function LangSwitch({ compact = false }) {
  const { lang, copy, langs } = useI18n()
  const { pathname } = useLocation()
  const base = stripLocale(pathname)
  return (
    <div className={`lang-switch ${compact ? 'is-compact' : ''}`} role="group" aria-label={copy.nav.language}>
      {langs.map((item) => (
        <PlainLink
          key={item.code}
          href={localize(base, item.code)}
          className={item.code === lang ? 'is-active' : ''}
          hrefLang={item.code}
          lang={item.code}
          aria-current={item.code === lang ? 'true' : undefined}
          aria-label={item.name}
          onClick={() => {
            document.cookie = `fenley-lang=${item.code}; path=/; max-age=31536000; sameSite=lax`
          }}
        >
          {item.label}
        </PlainLink>
      ))}
    </div>
  )
}

function Nav() {
  const { copy } = useI18n()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="nav-wrap">
      <nav className="nav container" aria-label="Primary">
        <BrandLink />

        <div className="nav-links">
          {PAGES.map((page) => (
            <NavLink key={page.to} to={page.to} end={page.end}>
              {copy.nav[page.key]}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <LangSwitch />
          <Link className="btn btn-primary btn-sm nav-cta" to="/contact">
            {copy.nav.cta}
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-label={open ? copy.nav.close : copy.nav.menu}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="container mobile-inner">
          {PAGES.map((page, index) => (
            <NavLink key={page.to} to={page.to} end={page.end} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span className="mobile-index">0{index + 1}</span>
              {copy.nav[page.key]}
            </NavLink>
          ))}
          <div className="mobile-foot">
            <Link className="btn btn-primary" to="/contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              {copy.nav.cta}
            </Link>
            <LangSwitch compact />
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  const { copy } = useI18n()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLink />
            <p>{copy.footer.tagline}</p>
            <span className="footer-location">{copy.footer.location}</span>
          </div>

          <div className="footer-col">
            <h3>{copy.footer.pages}</h3>
            {PAGES.map((page) => (
              <NavLink key={page.to} to={page.to} end={page.end}>
                {copy.nav[page.key]}
              </NavLink>
            ))}
          </div>

          <div className="footer-col">
            <h3>{copy.footer.contact}</h3>
            <a href="mailto:hi@fenleymenelas.com">hi@fenleymenelas.com</a>
            <a href="tel:+50931664446">+509 3166-4446</a>
            <a href="https://wa.me/50931664446" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="https://www.upwork.com/freelancers/~01cf968566f1af7018" target="_blank" rel="noreferrer">
              Upwork
            </a>
          </div>
        </div>

        <div className="footer-bar">
          <span>{copy.footer.rights}</span>
          <button
            type="button"
            className="to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {copy.footer.top} ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function Layout({ children }) {
  const location = useLocation()
  const { lang } = useI18n()
  useReveal(location.pathname + lang)

  return (
    <div className="site">
      <DustCanvas />
      <ScrollManager />
      <Nav />
      <main id="main">
        {children}
        <CTABand />
      </main>
      <Footer />
    </div>
  )
}
