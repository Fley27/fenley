import { Link } from './router.jsx'
import { useI18n } from './useI18n.js'

function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 44 44" width="28" height="28" aria-hidden="true">
      <defs>
        <linearGradient id="fm-grad" x1="9" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6EE7F9" />
          <stop offset="1" stopColor="#8B7CFF" />
        </linearGradient>
      </defs>
      <g fill="url(#fm-grad)">
        <path d="M6.35 34.72L2.5 34.72L2.5 9.28L18.82 9.28L18.82 12.88L6.35 12.88L6.35 20.66L16.82 20.66L16.82 24.04L6.35 24.04L6.35 34.72" />
        <path d="M26.49 34.72L22.82 34.72L22.82 9.28L26.89 9.28L32.16 20.76L37.43 9.28L41.5 9.28L41.5 34.72L37.83 34.72L37.83 16.62L33.69 25.71L30.63 25.71L26.49 16.66L26.49 34.72" />
      </g>
    </svg>
  )
}

export function BrandLink() {
  return (
    <Link className="brand" to="/" aria-label="Fenley Menelas — home">
      <BrandMark />
      <span className="brand-name">Fenley Menelas</span>
    </Link>
  )
}

export function PageHero({ kicker, title1, title2, lead, children }) {
  return (
    <section className="page-hero">
      <div className="glow glow-hero" aria-hidden="true" />
      <div className="container">
        <p className="kicker reveal">{kicker}</p>
        <h1 className="display reveal" data-dust-clear="">
          {title1}
          {title2 ? (
            <>
              <br />
              <span className="tone-2">{title2}</span>
            </>
          ) : null}
        </h1>
        {lead ? (
          <p className="lead reveal" data-dust-clear="">
            {lead}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  )
}

export function CTABand() {
  const { copy } = useI18n()
  return (
    <section className="cta-band">
      <div className="glow glow-cta" aria-hidden="true" />
      <div className="container cta-inner reveal">
        <p className="kicker">{copy.cta.kicker}</p>
        <h2 className="display display-md" data-dust-clear="">
          {copy.cta.title}
        </h2>
        <p className="lead" data-dust-clear="">
          {copy.cta.text}
        </p>
        <div className="cta-actions">
          <Link className="btn btn-primary btn-lg" to="/contact">
            {copy.cta.primary}
          </Link>
          <Link className="btn btn-ghost btn-lg" to="/services">
            {copy.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}

export function SectionHead({ kicker, title, lead, align = 'left' }) {
  return (
    <div className={`section-head section-head-${align} reveal`}>
      <p className="kicker">{kicker}</p>
      <h2 className="display display-md" data-dust-clear="">
        {title}
      </h2>
      {lead ? (
        <p className="lead" data-dust-clear="">
          {lead}
        </p>
      ) : null}
    </div>
  )
}
