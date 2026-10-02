'use client'
import { useI18n } from '../useI18n.js'
import { PageHero } from '../components.jsx'

export default function Build() {
  const { copy } = useI18n()
  const page = copy.build

  return (
    <>
      <PageHero kicker={page.hero.kicker} title1={page.hero.title1} title2={page.hero.title2} lead={page.hero.lead} />

      <section className="section container">
        <div className="grid-quad">
          {page.principles.map((point, index) => (
            <article key={point.t} className="card card-lg reveal" style={{ '--delay': `${index * 80}ms` }}>
              <span className="card-index">0{index + 1}</span>
              <h3>{point.t}</h3>
              <p>{point.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="band band-center reveal">
          <div className="glow glow-band" aria-hidden="true" />
          <div className="band-inner">
            <h2 className="display display-md" data-dust-clear="">
              {page.closing}
            </h2>
          </div>
        </div>
      </section>
    </>
  )
}
