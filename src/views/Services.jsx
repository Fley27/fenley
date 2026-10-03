'use client'
import { useState } from 'react'
import { Link } from '../router.jsx'
import { useI18n } from '../useI18n.js'
import { PageHero, SectionHead } from '../components.jsx'

export default function Services() {
  const { copy } = useI18n()
  const page = copy.services
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <PageHero kicker={page.hero.kicker} title1={page.hero.title1} title2={page.hero.title2} lead={page.hero.lead} />

      <section className="section container">
        <SectionHead kicker={page.listKicker} title={page.listTitle} />
        <div className="rows rows-detail">
          {page.list.map((item) => (
            <article key={item.n} className="row reveal" suppressHydrationWarning>
              <span className="row-index">{item.n}</span>
              <div className="row-body">
                <h3>{item.t}</h3>
                <p>{item.d}</p>
                <ul className="bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHead kicker={page.pricing.kicker} title={page.pricing.title} lead={page.pricing.lead} align="center" />
        <div className="pricing-grid">
          {page.pricing.cards.map((card, index) => (
            <article key={card.name} className={`price-card reveal ${index === 0 ? 'is-featured' : ''}`} suppressHydrationWarning>
              {index === 0 ? <span className="price-popular">{page.pricing.popular}</span> : null}
              <span className="price-name">{card.name}</span>
              <div className="price-value">
                <strong>{card.price}</strong>
                <span>{card.per}</span>
              </div>
              <p className="price-note">{card.note}</p>
              <span className="price-incl">{copy.common.included}</span>
              <ul className="check-list">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className={`btn ${index === 0 ? 'btn-primary' : 'btn-ghost'} btn-full`} to="/contact">
                {card.cta}
              </Link>
            </article>
          ))}
          <span className="price-plus" aria-hidden="true">
            +
          </span>
        </div>
        <p className="pricing-note reveal" suppressHydrationWarning>{page.pricing.note}</p>
      </section>

      <section className="section container">
        <SectionHead kicker={page.process.kicker} title={page.process.title} align="center" />
        <div className="steps">
          {page.process.steps.map((step, index) => (
            <div key={step.n} className="step reveal" suppressHydrationWarning style={{ '--delay': `${index * 80}ms` }}>
              <span>{step.n}</span>
              <h3>{step.t}</h3>
              <p>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="faq-grid">
          <div className="faq-head reveal" suppressHydrationWarning>
            <p className="kicker">{page.faq.kicker}</p>
            <h2 className="display display-md">{page.faq.title}</h2>
            <p className="lead">{page.faq.lead}</p>
          </div>
          <div className="faq-list reveal" suppressHydrationWarning>
            {page.faq.items.map((item, index) => (
              <div key={item.q} className={`faq-item ${openFaq === index ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="faq-a" aria-hidden={openFaq !== index}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
