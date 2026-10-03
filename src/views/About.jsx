'use client'
import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../useI18n.js'
import { Link } from '../router.jsx'
import { PageHero, SectionHead } from '../components.jsx'

export default function About() {
  const { copy } = useI18n()
  const page = copy.about
  const [hasPhoto, setHasPhoto] = useState(true)
  const imgRef = useRef(null)

  useEffect(() => {
    // the 404 can fire before hydration attaches onError — catch it here
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) setHasPhoto(false)
  }, [])

  return (
    <>
      <PageHero kicker={page.hero.kicker} title1={page.hero.title1} title2={page.hero.title2} lead={page.hero.lead} />

      <section className="section container">
        <div className="about-grid">
          <div className="about-story reveal" suppressHydrationWarning>
            <figure className="about-portrait">
              <div className="portrait-stage">
                {hasPhoto ? (
                  <img
                    ref={imgRef}
                    className="portrait-img"
                    src="/portrait.jpg"
                    alt={page.portrait.alt}
                    width="705"
                    height="940"
                    onError={() => setHasPhoto(false)}
                  />
                ) : (
                  <div className="portrait-ph" aria-hidden="true">
                    FM
                  </div>
                )}
              </div>
              <figcaption>
                <strong>{page.portrait.name}</strong>
                <span>{page.portrait.role}</span>
              </figcaption>
            </figure>
            {page.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <aside className="about-facts reveal" suppressHydrationWarning>
            {page.facts.map((fact) => (
              <div key={fact.l}>
                <strong>{fact.v}</strong>
                <span>{fact.l}</span>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section container">
        <SectionHead kicker={page.languages.kicker} title={page.languages.title} lead={page.languages.lead} align="center" />
        <div className="grid-3">
          {page.languages.items.map((item, index) => (
            <article key={item.t} className="card card-lg reveal" suppressHydrationWarning style={{ '--delay': `${index * 90}ms` }}>
              <span className="card-index">0{index + 1}</span>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="band reveal" suppressHydrationWarning>
          <div className="glow glow-band" aria-hidden="true" />
          <div className="band-inner">
            <div className="band-head">
              <p className="kicker kicker-light">{page.founder.kicker}</p>
              <h2 className="display display-md">{page.founder.title}</h2>
              <p className="lead lead-light">{page.founder.lead}</p>
            </div>
            <div className="band-grid">
              {page.founder.points.map((point) => (
                <div key={point.t}>
                  <h3>{point.t}</h3>
                  <p>{point.d}</p>
                </div>
              ))}
            </div>
            <Link className="btn btn-light" to="/contact">
              {copy.common.start}
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead kicker={page.values.kicker} title={page.values.title} align="center" />
        <div className="grid-quad">
          {page.values.items.map((value, index) => (
            <article key={value.t} className="card card-lg reveal" suppressHydrationWarning style={{ '--delay': `${index * 80}ms` }}>
              <span className="card-index">0{index + 1}</span>
              <h3>{value.t}</h3>
              <p>{value.d}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
