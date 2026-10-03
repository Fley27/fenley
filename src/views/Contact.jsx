'use client'
import { useState } from 'react'
import { useI18n } from '../useI18n.js'
import { PageHero, SectionHead } from '../components.jsx'

const EMAIL = 'hi@fenleymenelas.com'

export default function Contact() {
  const { copy, lang, langs } = useI18n()
  const page = copy.contact
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setSending(true)
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `Project inquiry — ${data.need}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const json = await res.json().catch(() => null)
      const ok = res.ok && json && (json.success === true || json.success === 'true')
      if (!ok) throw new Error('send failed')
      form.reset()
      setSent(true)
    } catch {
      /* delivery failed — button re-enables, direct email links remain below */
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero kicker={page.hero.kicker} title1={page.hero.title1} title2={page.hero.title2} lead={page.hero.lead} />

      <section className="section container contact-grid">
        <div className="contact-main reveal" suppressHydrationWarning>
          {sent ? (
            <div className="success">
              <span className="success-mark" aria-hidden="true">
                ✓
              </span>
              <h2>{page.form.sent}</h2>
              <p>{page.form.sentText}</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setSent(false)
                  const form = document.getElementById('intake')
                  if (form) form.reset()
                }}
              >
                {page.form.sendAnother}
              </button>
            </div>
          ) : (
            <form id="intake" className="form" onSubmit={submit}>
              <h2 className="form-title">{page.form.title}</h2>

              <input
                className="hp-field"
                type="text"
                name="_honey"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                defaultValue=""
              />
              <div className="form-row">
                <label>
                  {page.form.name}
                  <input required name="name" placeholder={page.form.namePh} autoComplete="name" />
                </label>
                <label>
                  {page.form.email}
                  <input required type="email" name="email" placeholder={page.form.emailPh} autoComplete="email" />
                </label>
              </div>

              <label>
                {page.form.business}
                <input name="business" placeholder={page.form.businessPh} autoComplete="organization" />
              </label>

              <div className="form-row">
                <label>
                  {page.form.need}
                  <select name="need" defaultValue={page.form.needOptions[0]}>
                    {page.form.needOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label>
                  {page.form.lang}
                  <select name="lang" defaultValue={lang}>
                    {langs.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                {page.form.message}
                <textarea required name="message" rows="5" placeholder={page.form.messagePh} />
              </label>

              <button className="btn btn-primary btn-lg btn-full" type="submit" disabled={sending} aria-busy={sending}>
                {sending ? `${page.form.submit}…` : page.form.submit}
              </button>
            </form>
          )}
        </div>

        <aside className="contact-side">
          <SectionHead kicker={page.steps.kicker} title={page.steps.title} />
          <ol className="next-steps">
            {page.steps.items.map((step) => (
              <li key={step.n} className="reveal" suppressHydrationWarning>
                <span>{step.n}</span>
                <div>
                  <strong>{step.t}</strong>
                  <p>{step.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="direct reveal" suppressHydrationWarning>
            <p className="kicker">{page.direct.kicker}</p>
            <h3>{page.direct.title}</h3>
            <a className="direct-line" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <a className="direct-line" href="tel:+50931664446">
              +509 3166-4446 · {page.direct.whatsapp}
            </a>
            <a
              className="direct-line"
              href="https://www.linkedin.com/in/fenley-jude-viky-menelas/"
              target="_blank"
              rel="noreferrer"
            >
              {page.direct.linkedin} ↗
            </a>
            <p className="direct-meta">
              {page.direct.response} · {page.direct.location}
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}
