'use client'
import { useI18n } from '../useI18n.js'
import { PageHero, SectionHead } from '../components.jsx'

export default function Skills() {
  const { copy } = useI18n()
  const page = copy.skills

  return (
    <>
      <PageHero kicker={page.hero.kicker} title1={page.hero.title1} title2={page.hero.title2} lead={page.hero.lead} />

      <section className="section container">
        <SectionHead kicker={page.list.kicker} title={page.list.title} lead={page.list.lead} />
        <div className="rows rows-detail">
          {page.items.map((item, index) => (
            <article key={item.n} className="row reveal" suppressHydrationWarning style={{ '--delay': `${index * 60}ms` }}>
              <span className="row-index">{item.n}</span>
              <div className="row-body">
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
