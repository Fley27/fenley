import { Link } from './router.jsx'
import { useI18n } from './useI18n.js'

function BrandMark() {
  return (
    <img
      className="brand-mark"
      src="/avatar.jpg"
      alt=""
      width="38"
      height="38"
      aria-hidden="true"
    />
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
