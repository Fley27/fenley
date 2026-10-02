'use client'
import { Link } from '../router.jsx'
import { useI18n } from '../useI18n.js'
import { SectionHead } from '../components.jsx'
import { Mock } from '../mocks.jsx'

const SHOW_SELECTED_WORK = false

export default function Home() {
  const { copy } = useI18n()
  const home = copy.home

  return (
    <>
      <section className="hero">
        <div className="glow glow-hero" aria-hidden="true" />
        <div className="container">
          <p className="kicker reveal">{home.hero.eyebrow}</p>
          <h1 className="display reveal">
            {home.hero.title1}
            <br />
            <span className="tone-2">{home.hero.title2}</span>
          </h1>
          <p className="lead reveal">{home.hero.lead}</p>

          <div className="hero-actions reveal">
            <Link className="btn btn-primary btn-lg" to="/contact">
              {home.hero.cta1}
            </Link>
            <Link className="btn btn-ghost btn-lg" to="/build">
              {home.hero.cta2}
            </Link>
          </div>

          <p className="hero-micro reveal">{home.hero.micro}</p>

          <div className="hero-stats reveal">
            {home.hero.stats.map((stat) => (
              <div key={stat.l} className="stat">
                <strong>{stat.v}</strong>
                <span>{stat.l}</span>
              </div>
            ))}
          </div>

          <div className="hero-frame reveal">
            <div className="frame-bar">
              <i />
              <i />
              <i />
              <span className="frame-url">{home.hero.frameUrl}</span>
              <span className="frame-badge">ES</span>
            </div>
            <div className="frame-body">
              <div className="frame-top">
                <span className="mock-line w40" />
                <span className="frame-pills">
                  <b />
                  <b />
                  <b />
                </span>
              </div>
              <div className="frame-hero-block">
                <span className="mock-line w70 light" />
                <span className="mock-line w50 light" />
                <span className="frame-cta" />
              </div>
              <div className="frame-cards">
                <b />
                <b />
                <b />
              </div>
            </div>
            <span className="float-chip float-chip-a">LCP &lt; 2.5s</span>
            <span className="float-chip float-chip-b">EN · ES · FR</span>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead kicker={home.story.kicker} title={home.story.title} lead={home.story.lead} align="center" />
        <div className="grid-3">
          {home.story.cards.map((card, index) => (
            <article key={card.t} className="card reveal" style={{ '--delay': `${index * 90}ms` }}>
              <span className="card-index">0{index + 1}</span>
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHead kicker={home.services.kicker} title={home.services.title} lead={home.services.lead} />
        <div className="rows">
          {home.services.items.map((item) => (
            <Link key={item.n} className="row reveal" to="/services">
              <span className="row-index">{item.n}</span>
              <div className="row-body">
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
              <span className="row-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
        <div className="section-foot reveal">
          <Link className="link-arrow" to="/services">
            {home.services.link} →
          </Link>
        </div>
      </section>

      <section className="section container">
        <div className="band reveal">
          <div className="glow glow-band" aria-hidden="true" />
          <div className="band-inner">
            <div className="band-head">
              <p className="kicker kicker-light">{home.speed.kicker}</p>
              <h2 className="display display-md">{home.speed.title}</h2>
              <p className="lead lead-light">{home.speed.lead}</p>
            </div>
            <div className="band-grid">
              {home.speed.points.map((point) => (
                <div key={point.t}>
                  <h3>{point.t}</h3>
                  <p>{point.d}</p>
                </div>
              ))}
            </div>
            <Link className="btn btn-light" to="/build">
              {home.speed.link}
            </Link>
          </div>
        </div>
      </section>

      {SHOW_SELECTED_WORK && (
        <section className="section container">
          <SectionHead kicker={home.work.kicker} title={home.work.title} lead={home.work.lead} />
          <div className="grid-3">
            {home.work.items.map((item, index) => (
              <Link key={item.t} className="card card-link reveal" to="/work" style={{ '--delay': `${index * 90}ms` }}>
                <Mock kind={index === 1 ? 'phone' : index === 2 ? 'dash' : 'browser'} />
                <span className="tag">{item.tag}</span>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </Link>
            ))}
          </div>
          <div className="section-foot reveal">
            <Link className="link-arrow" to="/work">
              {home.work.link} →
            </Link>
          </div>
        </section>
      )}

      <section className="langs-band">
        <div className="container langs-inner reveal">
          <p className="kicker">{home.langs.kicker}</p>
          <h2 className="display display-md">{home.langs.title}</h2>
          <p className="lead">{home.langs.lead}</p>
          <p className="note">{home.langs.note}</p>
        </div>
      </section>
    </>
  )
}
