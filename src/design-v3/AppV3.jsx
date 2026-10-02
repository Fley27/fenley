import { useEffect, useRef, useState } from 'react'
import marketCheckout from '../assets/market-checkout.jpg'
import getTranslation from '../utils/translation.ts'
import './AppV3.css'

const translations = {
  en: getTranslation.en,
  fr: getTranslation.fr,
  ht: getTranslation.ht
}

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.v3-root [data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' })
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const d = parseFloat(e.target.dataset.reveal) || 0
            setTimeout(() => { e.target.classList.add('v3-visible') }, d)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

function useCountUp(target, startOnView) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!startOnView || started || !ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect() }
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [startOnView, started])
  useEffect(() => {
    if (!started) return
    let frame
    const num = parseInt(target, 10)
    if (isNaN(num)) return
    const duration = 1200
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * num))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])
  return { ref, val }
}

function AppV3() {
  const contactEmail = 'hi@fenleymenelas.com'
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [bookingSent, setBookingSent] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('fenley-language') || 'en')
  const copy = translations[language]

  const { ref: yearsRef, val: yearsVal } = useCountUp('10', true)

  useEffect(() => {
    localStorage.setItem('fenley-language', language)
    document.documentElement.lang = language === 'ht' ? 'ht' : language
  }, [language])

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 40)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useReveal(language)

  const openBooking = () => { setBookingSent(false); setIsBookingOpen(true) }

  const sendContact = (event) => {
    event.preventDefault()
    const d = new FormData(event.currentTarget)
    window.location.href = `mailto:${contactEmail}?subject=New project inquiry from ${d.get('name')}&body=${encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\n\n${d.get('message')}`)}`
    setContactSent(true)
  }

  const requestBooking = (event) => {
    event.preventDefault()
    const d = new FormData(event.currentTarget)
    window.location.href = `mailto:${contactEmail}?subject=Call request for ${d.get('day')} at ${d.get('time')}&body=Please confirm this 30-minute call for ${d.get('day')} at ${d.get('time')} EST.\n\nClient email: ${d.get('email')}`
    setBookingSent(true)
  }

  return (
    <div className="v3-root">
      {/* ─── NAV ─── */}
      <div className="v3-nav-sticky">
        <nav className={`v3-nav ${isScrolled ? 'v3-nav-solid' : ''}`}>
          <a className="v3-brand" href="#top" aria-label="Fenley Menelas home">
            <span className="v3-wordmark"><strong>Fenley</strong><b>MENELAS</b><i aria-hidden="true" /></span>
          </a>
          <div className="v3-nav-links">
            <a href="#services">{copy.services}</a>
            <a href="#approach">{copy.approach}</a>
            <a href="#contact">{copy.contact}</a>
          </div>
          <div className="v3-nav-actions">
            <div className="v3-lang" aria-label="Language selector">
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">EN</button>
              <button className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')} type="button">FR</button>
              <button className={language === 'ht' ? 'active' : ''} onClick={() => setLanguage('ht')} type="button">KRE</button>
            </div>
            <button className="v3-btn v3-btn-nav" type="button" onClick={openBooking}>{copy.book} <span className="v3-arrow">↗</span></button>
          </div>
        </nav>
      </div>

      {/* ─── HERO ─── */}
      <section className="v3-hero" id="top">
        <div className="v3-hero-bg" aria-hidden="true"><div className="v3-hero-gradient" /></div>
        <div className="v3-shell v3-hero-layout">
          <div className="v3-hero-content">
            <div className="v3-chip" data-reveal="0"><span className="v3-chip-dot" /> {copy.eyebrow}</div>
            <h1 data-reveal="60">{copy.heroTitle}<br /><em>{copy.heroAccent}</em></h1>
            <p className="v3-hero-sub" data-reveal="120">{copy.heroText}</p>
            <div className="v3-hero-actions" data-reveal="180">
              <a className="v3-btn v3-btn-primary" href="#contact">{copy.start} <span className="v3-arrow">↗</span></a>
              <button className="v3-btn v3-btn-ghost" type="button" onClick={openBooking}>{copy.book} <span className="v3-arrow">↗</span></button>
            </div>
            <div className="v3-hero-meta" data-reveal="240">
              <div className="v3-hero-note"><span className="v3-avatar">FM</span><span>{copy.based}<br /><b>{copy.happy}</b></span></div>
            </div>
            <div className="v3-hero-stats" data-reveal="300">
              <div className="v3-stat">
                <span className="v3-stat-num" ref={yearsRef}>{yearsVal}</span>
                <span className="v3-stat-label">{copy.years}</span>
              </div>
              <div className="v3-stat-sep" />
              <div className="v3-stat">
                <span className="v3-stat-num">{copy.prefixTypes}</span>
                <span className="v3-stat-label">{copy.types}</span>
              </div>
            </div>
          </div>
          <div className="v3-hero-visual" data-reveal="100">
            <div className="v3-image-wrap">
              <div className="v3-image-frame">
                <img src={marketCheckout} alt="Two women using mobile commerce at a local market" fetchPriority="high" decoding="async" />
              </div>
              <div className="v3-image-ring" aria-hidden="true" />
            </div>
            <div className="v3-dash">
              <div className="v3-dash-head"><span>{copy.stock}</span><span className="v3-live-dot"><i /> {copy.live}</span></div>
              <div className="v3-dash-row"><div><small>{copy.items}</small><strong>1,284</strong></div><span className="v3-dash-trend">↑ 12.8%</span></div>
              <div className="v3-dash-bars">
                {[42, 60, 50, 78, 67, 92, 84, 100].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} className={i % 2 === 0 ? 'v3-bar-a' : 'v3-bar-b'} />
                ))}
              </div>
              <div className="v3-dash-days">{copy.days.map((d) => <span key={d}>{d}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIGNAL STRIP ─── */}
      <section className="v3-signal" data-reveal="0">
        <div className="v3-shell">
          <div className="v3-signal-row">
            <span className="v3-signal-item"><span className="v3-signal-num">01</span> {copy.local}</span>
            <span className="v3-signal-item"><span className="v3-signal-num">02</span> {copy.offline}</span>
            <span className="v3-signal-item"><span className="v3-signal-num">03</span> {copy.grow}</span>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="v3-services" id="services">
        <div className="v3-shell">
          <div className="v3-section-header" data-reveal="0">
            <div className="v3-chip"><span className="v3-chip-dot" /> {copy.what}</div>
            <h2>{copy.messy}<br /><em>{copy.momentum}</em></h2>
          </div>
          <div className="v3-service-list">
            {[
              { no: '01', title: copy.inventory, text: copy.inventoryText },
              { no: '02', title: copy.digital, text: copy.digitalText },
              { no: '03', title: copy.custom, text: copy.customText }
            ].map((s, i) => (
              <article className="v3-service-row" key={s.no} data-reveal={String(i * 80)}>
                <span className="v3-service-num">{s.no}</span>
                <div className="v3-service-body"><h3>{s.title}</h3><p>{s.text}</p></div>
                <span className="v3-arrow-circ">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VISIBILITY ─── */}
      <section className="v3-visibility">
        <div className="v3-shell">
          <div className="v3-vis-card" data-reveal="0">
            <div className="v3-vis-left">
              <div className="v3-vis-icon" role="img" aria-label="Location signal">
                <i /><i /><i />
              </div>
              <div>
                <div className="v3-chip v3-chip-light"><span className="v3-chip-dot" /> {copy.find}</div>
                <h2>{copy.map}<br /><em>{copy.mapAccent}</em></h2>
                <p>{copy.mapText}</p>
              </div>
            </div>
            <div className="v3-vis-right">
              <span className="v3-vis-badge">{copy.visibility}</span>
              <strong>{copy.moreWays}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MONCASH ─── */}
      <section className="v3-payment">
        <div className="v3-shell">
          <div className="v3-pay-card" data-reveal="0">
            <div className="v3-pay-top">
              <div className="v3-pay-icon" role="img" aria-label="Mobile contactless payment">
                <span className="v3-phone-icon" />
                <i /><i /><i />
              </div>
              <div>
                <div className="v3-chip"><span className="v3-chip-dot" /> {copy.opportunity}</div>
                <h2>{copy.payment}<br /><em>{copy.paymentAccent}</em></h2>
              </div>
            </div>
            <p>{copy.paymentText}</p>
            <div className="v3-pay-bottom">
              <div className="v3-pay-tags">
                {[copy.restaurants, copy.retail, copy.hotels, copy.hospitals, copy.service, copy.more].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="v3-pay-metrics">
                <div className="v3-pay-metric"><span className="v3-pay-metric-num">01</span><p>{copy.payFaster}</p></div>
                <div className="v3-pay-metric"><span className="v3-pay-metric-num">02</span><p>{copy.reachFurther}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── APPROACH ─── */}
      <section className="v3-approach" id="approach">
        <div className="v3-approach-bg" aria-hidden="true" />
        <div className="v3-shell v3-approach-grid">
          <div data-reveal="0">
            <div className="v3-chip v3-chip-lime"><span className="v3-chip-dot" /> {copy.way}</div>
            <h2>{copy.technology}<br /><em>{copy.meet}</em></h2>
          </div>
          <div className="v3-approach-body" data-reveal="120">
            <p>{copy.approachText1}</p>
            <p>{copy.approachText2}</p>
            <a className="v3-btn v3-btn-lime" href="#contact">{copy.build} <span className="v3-arrow">↗</span></a>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="v3-contact" id="contact">
        <div className="v3-shell v3-contact-grid">
          <div className="v3-contact-left" data-reveal="0">
            <div className="v3-chip"><span className="v3-chip-dot" /> {copy.problem}</div>
            <h2>{copy.clear}<br /><em>{copy.clearAccent}</em></h2>
            <p>{copy.contactText}</p>
            <form className="v3-form" onSubmit={sendContact}>
              {contactSent ? (
                <div className="v3-form-ok"><strong>{copy.draft}</strong><span>{copy.draftText}</span></div>
              ) : (
                <>
                  <label>{copy.name}<input required name="name" placeholder={copy.yourName} /></label>
                  <label>{copy.email}<input required type="email" name="email" placeholder={copy.emailPlaceholder} /></label>
                  <label>{copy.message}<textarea required name="message" rows="3" placeholder={copy.messagePlaceholder}></textarea></label>
                  <button className="v3-btn v3-btn-dark" type="submit">{copy.send} <span className="v3-arrow">↗</span></button>
                </>
              )}
            </form>
          </div>
          <div className="v3-contact-right" data-reveal="120">
            <div className="v3-booking-card">
              <span className="v3-booking-kicker">{copy.prefer}</span>
              <h3>{copy.findTime}</h3>
              <p>{copy.bookingText}</p>
              <button className="v3-btn v3-btn-lime" type="button" onClick={openBooking}>{copy.available} <span className="v3-arrow">↗</span></button>
            </div>
            <div className="v3-contact-info">
              <span>{copy.call}</span>
              <div className="v3-contact-links">
                <a href="tel:+50931664446">+509 3166-4446 <span className="v3-arrow-sm">↗</span></a>
                <a href="https://wa.me/50931664446" target="_blank" rel="noreferrer">{copy.whatsapp} <span className="v3-arrow-sm">↗</span></a>
              </div>
            </div>
            <a className="v3-upwork-link" href="https://www.upwork.com/freelancers/~01cf968566f1af7018" target="_blank" rel="noreferrer">{copy.upwork} <span className="v3-arrow-sm">↗</span></a>
          </div>
        </div>
      </section>

      <footer className="v3-footer">
        <div className="v3-shell v3-footer-inner">
          <span>© 2026 Fenley Menelas</span>
          <span>{copy.footerTagline}</span>
          <span>{copy.footerLocation}</span>
        </div>
      </footer>

      {isBookingOpen && (
        <div className="v3-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setIsBookingOpen(false) }}>
          <section className="v3-modal" role="dialog" aria-modal="true" aria-labelledby="v3-btitle">
            <button className="v3-modal-x" type="button" aria-label="Close" onClick={() => setIsBookingOpen(false)}>×</button>
            {bookingSent ? (
              <div className="v3-modal-ok">
                <span className="v3-modal-check">✓</span>
                <h2>{copy.draft}</h2>
                <p>{copy.draftText}</p>
                <button className="v3-btn v3-btn-dark" type="button" onClick={() => setIsBookingOpen(false)}>{copy.done} <span className="v3-arrow">↗</span></button>
              </div>
            ) : (
              <>
                <div className="v3-chip"><span className="v3-chip-dot" /> {copy.schedule}</div>
                <h2 id="v3-btitle">{copy.yourTime}<br /><em>{copy.yourTimeAccent}</em></h2>
                <p className="v3-modal-sub">{copy.chooseTime}</p>
                <form className="v3-form" onSubmit={requestBooking}>
                  <label>{copy.yourEmail}<input required type="email" name="email" placeholder={copy.emailPlaceholder} /></label>
                  <div className="v3-booking-opts">
                    <label>{copy.day}<select name="day" defaultValue="Tuesday, Sep 1"><option>Tuesday, Sep 1</option><option>Wednesday, Sep 2</option><option>Thursday, Sep 3</option></select></label>
                    <label>{copy.time}<select name="time" defaultValue="10:00 AM"><option>10:00 AM</option><option>1:30 PM</option><option>3:00 PM</option></select></label>
                  </div>
                  <button className="v3-btn v3-btn-dark" type="submit">{copy.request} <span className="v3-arrow">↗</span></button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default AppV3
