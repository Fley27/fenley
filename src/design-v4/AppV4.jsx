import { useEffect, useState } from 'react'
import marketCheckout from '../assets/market-checkout.jpg'
import getTranslation from '../utils/translation.ts'
import './AppV4.css'

const translations = {
  en: getTranslation.en,
  fr: getTranslation.fr,
  ht: getTranslation.ht
}

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.v4-root .reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

function AppV4() {
  const contactEmail = 'hi@fenleymenelas.com'
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [bookingSent, setBookingSent] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('fenley-language') || 'en')
  const copy = translations[language]
  const builds = String(copy.builds || '').split('·').map((s) => s.trim()).filter(Boolean)

  useEffect(() => {
    localStorage.setItem('fenley-language', language)
    document.documentElement.lang = language === 'ht' ? 'ht' : language
  }, [language])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useReveal(language)

  const openBooking = () => {
    setBookingSent(false)
    setIsBookingOpen(true)
  }

  const sendContact = (event) => {
    event.preventDefault()
    const details = new FormData(event.currentTarget)
    window.location.href = `mailto:${contactEmail}?subject=New project inquiry from ${details.get('name')}&body=${encodeURIComponent(`Name: ${details.get('name')}\nEmail: ${details.get('email')}\n\n${details.get('message')}`)}`
    setContactSent(true)
  }

  const requestBooking = (event) => {
    event.preventDefault()
    const details = new FormData(event.currentTarget)
    window.location.href = `mailto:${contactEmail}?subject=Call request for ${details.get('day')} at ${details.get('time')}&body=Please confirm this 30-minute call for ${details.get('day')} at ${details.get('time')} EST.\n\nClient email: ${details.get('email')}`
    setBookingSent(true)
  }

  return (
    <div className="v4-root">
      <header className={`v4-navwrap ${isScrolled ? 'is-scrolled' : ''}`}>
        <nav className="v4-nav" aria-label="Primary">
          <a className="v4-brand" href="#top" aria-label="Fenley Menelas home">
            <span className="v4-brand-mark" aria-hidden="true" />
            <span className="v4-brand-type"><strong>Fenley Menelas</strong></span>
          </a>
          <div className="v4-nav-links">
            <a href="#services">{copy.services}</a>
            <a href="#work">{copy.showcaseEyebrow}</a>
            <a href="#approach">{copy.approach}</a>
            <a href="#contact">{copy.contact}</a>
          </div>
          <div className="v4-nav-actions">
            <div className="v4-lang" aria-label="Language selector">
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">EN</button>
              <button className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')} type="button">FR</button>
              <button className={language === 'ht' ? 'active' : ''} onClick={() => setLanguage('ht')} type="button">KRE</button>
            </div>
            <button className="v4-btn v4-btn-primary v4-btn-sm" type="button" onClick={openBooking}>{copy.book}</button>
          </div>
        </nav>
      </header>

      {/* HERO — centered, gallery-first */}
      <section className="v4-hero" id="top">
        <div className="v4-hero-bg" aria-hidden="true" />
        <div className="v4-wrap v4-center">
          <p className="v4-eyebrow reveal">{copy.eyebrow}</p>
          <h1 className="v4-title reveal">{copy.heroTitle}<br />{copy.heroAccent}</h1>
          <p className="v4-lead reveal">{copy.heroText}</p>
          {builds.length > 0 && (
            <p className="v4-builds reveal" aria-label="What I build">{builds.join('  ·  ')}</p>
          )}
          <div className="v4-ctas reveal">
            <a className="v4-btn v4-btn-primary v4-btn-lg" href="#contact">{copy.start}</a>
            <button className="v4-btn v4-btn-quiet v4-btn-lg" type="button" onClick={openBooking}>{copy.book}</button>
          </div>
          <p className="v4-micro reveal">{copy.trustedRow} · {copy.replies} · {copy.languages}</p>
        </div>

        <div className="v4-wrap">
          <figure className="v4-gallery reveal">
            <div className="v4-gallery-frame">
              <img
                src={marketCheckout}
                alt="Two women using mobile commerce at a local market"
                fetchPriority="high"
                decoding="async"
                width="1600"
                height="1000"
              />
            </div>
            <figcaption className="v4-caption">
              <span>N°01 — {copy.localCommerce}</span>
              <span>{copy.based}</span>
            </figcaption>
          </figure>

          <div className="v4-hero-grid">
            <figure className="v4-detail reveal">
              <div className="v4-detail-frame">
                <img
                  src={marketCheckout}
                  alt="Detail of hands completing a mobile payment"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="800"
                />
              </div>
              <figcaption className="v4-caption"><span>Detail — {copy.happy}</span></figcaption>
            </figure>
            <div className="v4-stat reveal">
              <div className="v4-stat-top"><span>{copy.stock}</span><span className="v4-live"><i />{copy.live}</span></div>
              <div className="v4-stat-row"><div><small>{copy.items}</small><strong>1,284</strong></div><span className="v4-trend">↑ 12.8%</span></div>
              <div className="v4-bars" aria-hidden="true"><i style={{height:'42%'}} /><i style={{height:'60%'}} /><i style={{height:'50%'}} /><i style={{height:'78%'}} /><i style={{height:'67%'}} /><i style={{height:'92%'}} /><i style={{height:'84%'}} /><i style={{height:'100%'}} /></div>
              <div className="v4-stat-days">{copy.days.map((day) => <span key={day}>{day}</span>)}</div>
              <div className="v4-proof">
                <div><strong>{copy.wowCardTitle}</strong><span>{copy.wowCardText}</span></div>
                <div><strong>{copy.ownCardTitle}</strong><span>{copy.ownCardText}</span></div>
              </div>
            </div>
          </div>

          <div className="v4-meta reveal">
            <div><strong>10</strong><span>{copy.years}</span></div>
            <div><strong>{copy.prefixTypes}</strong><span>{copy.types}</span></div>
          </div>
        </div>
      </section>

      {/* SIGNAL — quiet strip */}
      <section className="v4-signal reveal">
        <div className="v4-wrap v4-signal-row">
          <p>{copy.local}</p>
          <p>{copy.offline}</p>
          <p>{copy.grow}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="v4-section v4-wrap v4-center reveal" id="services">
        <p className="v4-kicker">01 — {copy.what}</p>
        <h2 className="v4-h2">{copy.messy}<br />{copy.momentum}</h2>
        <div className="v4-rows">
          <article className="v4-row">
            <span className="v4-no">01</span>
            <div><h3>{copy.inventory}</h3><p>{copy.inventoryText}</p></div>
          </article>
          <article className="v4-row">
            <span className="v4-no">02</span>
            <div><h3>{copy.digital}</h3><p>{copy.digitalText}</p></div>
          </article>
          <article className="v4-row">
            <span className="v4-no">03</span>
            <div><h3>{copy.custom}</h3><p>{copy.customText}</p></div>
          </article>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="v4-section v4-wrap v4-center reveal" id="work">
        <p className="v4-kicker">02 — {copy.showcaseEyebrow}</p>
        <h2 className="v4-h2">{copy.showcaseTitle}<br />{copy.showcaseAccent}</h2>
        <p className="v4-sub">{copy.showcaseText}</p>
        <div className="v4-cards">
          <article className="v4-card">
            <div className="v4-mock v4-mock-browser" aria-hidden="true">
              <div className="v4-mock-bar"><i /><i /><i /><span /></div>
              <div className="v4-mock-hero" />
              <div className="v4-mock-lines"><i /><i /><i /></div>
            </div>
            <h3>{copy.webTitle}</h3>
            <p>{copy.webText}</p>
            <span className="v4-outcome">{copy.webOutcome}</span>
          </article>
          <article className="v4-card v4-card-dark">
            <div className="v4-mock v4-mock-phone" aria-hidden="true">
              <div className="v4-notch" />
              <div className="v4-screen"><div className="v4-screen-hero" /><div className="v4-mock-lines light"><i /><i /></div></div>
            </div>
            <h3>{copy.appTitle}</h3>
            <p>{copy.appText}</p>
            <span className="v4-outcome">{copy.appOutcome}</span>
          </article>
          <article className="v4-card">
            <div className="v4-mock v4-mock-dash" aria-hidden="true">
              <div className="v4-dash-cards"><b /><b /><b /></div>
              <div className="v4-dash-chart"><i style={{height:'40%'}} /><i style={{height:'65%'}} /><i style={{height:'50%'}} /><i style={{height:'85%'}} /><i style={{height:'100%'}} /></div>
            </div>
            <h3>{copy.sysTitle}</h3>
            <p>{copy.sysText}</p>
            <span className="v4-outcome">{copy.sysOutcome}</span>
          </article>
        </div>
      </section>

      {/* TRUST */}
      <section className="v4-section v4-wrap reveal">
        <div className="v4-trust v4-center">
          <p className="v4-kicker">03 — {copy.trustEyebrow}</p>
          <h2 className="v4-h2">{copy.trustTitle}<br />{copy.trustAccent}</h2>
          <div className="v4-trust-grid">
            <div><strong>{copy.trust1t}</strong><p>{copy.trust1d}</p></div>
            <div><strong>{copy.trust2t}</strong><p>{copy.trust2d}</p></div>
            <div><strong>{copy.trust3t}</strong><p>{copy.trust3d}</p></div>
            <div><strong>{copy.trust4t}</strong><p>{copy.trust4d}</p></div>
          </div>
        </div>
      </section>

      {/* VISIBILITY + PAYMENT */}
      <section className="v4-section v4-wrap v4-center reveal">
        <p className="v4-kicker">04 — {copy.find}</p>
        <h2 className="v4-h2">{copy.map}<br />{copy.mapAccent}</h2>
        <p className="v4-sub">{copy.mapText}</p>
        <p className="v4-micro-dark">{copy.visibility} — {copy.moreWays}</p>
      </section>

      <section className="v4-section v4-wrap v4-center reveal">
        <p className="v4-kicker">05 — {copy.opportunity}</p>
        <h2 className="v4-h2">{copy.payment}<br />{copy.paymentAccent}</h2>
        <p className="v4-sub">{copy.paymentText}</p>
        <p className="v4-chips">{copy.restaurants} · {copy.retail} · {copy.hotels} · {copy.hospitals} · {copy.service} · {copy.more}</p>
        <div className="v4-duo-mini">
          <div><strong>01</strong><p>{copy.payFaster}</p></div>
          <div><strong>02</strong><p>{copy.reachFurther}</p></div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="v4-approach reveal" id="approach">
        <div className="v4-wrap v4-center">
          <p className="v4-kicker v4-kicker-light">06 — {copy.way}</p>
          <h2 className="v4-h2 v4-h2-light">{copy.technology}<br />{copy.meet}</h2>
          <p className="v4-sub v4-sub-light">{copy.approachText1}</p>
          <p className="v4-sub v4-sub-light">{copy.approachText2}</p>
          <a className="v4-btn v4-btn-light v4-btn-lg" href="#contact">{copy.build}</a>
          <div className="v4-process">
            <div><span>01</span><strong>{copy.process1t}</strong><p>{copy.process1d}</p></div>
            <div><span>02</span><strong>{copy.process2t}</strong><p>{copy.process2d}</p></div>
            <div><span>03</span><strong>{copy.process3t}</strong><p>{copy.process3d}</p></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="v4-section v4-wrap v4-narrow v4-center reveal" id="contact">
        <p className="v4-kicker">07 — {copy.problem}</p>
        <h2 className="v4-h2">{copy.clear}<br />{copy.clearAccent}</h2>
        <p className="v4-sub">{copy.contactText}</p>
        <form className="v4-form" onSubmit={sendContact}>
          {contactSent ? (
            <div className="v4-success"><strong>{copy.draft}</strong><span>{copy.draftText}</span></div>
          ) : (
            <>
              <label>{copy.name}<input required name="name" placeholder={copy.yourName} autoComplete="name" /></label>
              <label>{copy.email}<input required type="email" name="email" placeholder={copy.emailPlaceholder} autoComplete="email" /></label>
              <label>{copy.message}<textarea required name="message" rows="4" placeholder={copy.messagePlaceholder}></textarea></label>
              <button className="v4-btn v4-btn-primary v4-btn-lg v4-full" type="submit">{copy.send}</button>
            </>
          )}
        </form>
        <div className="v4-book">
          <span className="v4-micro-dark">{copy.prefer}</span>
          <h3>{copy.findTime}</h3>
          <p>{copy.bookingText}</p>
          <button className="v4-btn v4-btn-dark v4-btn-lg" type="button" onClick={openBooking}>{copy.available}</button>
        </div>
        <div className="v4-direct">
          <span>{copy.call}</span>
          <div>
            <a href="tel:+50931664446">+509 3166-4446</a>
            <span aria-hidden="true"> · </span>
            <a href="https://wa.me/50931664446" target="_blank" rel="noreferrer">{copy.whatsapp}</a>
          </div>
          <a className="v4-upwork" href="https://www.upwork.com/freelancers/~01cf968566f1af7018" target="_blank" rel="noreferrer">{copy.upwork}</a>
        </div>
      </section>

      <footer className="v4-footer v4-wrap">
        <span>© 2026 Fenley Menelas</span>
        <span>{copy.footerTagline}</span>
        <span>{copy.footerLocation}</span>
      </footer>

      {isBookingOpen && (
        <div className="v4-modal-bg" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsBookingOpen(false) }}>
          <section className="v4-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="v4-modal-x" type="button" aria-label="Close booking dialog" onClick={() => setIsBookingOpen(false)}>×</button>
            {bookingSent ? (
              <div className="v4-center">
                <h2 className="v4-h2">{copy.draft}</h2>
                <p className="v4-sub">{copy.draftText}</p>
                <button className="v4-btn v4-btn-primary v4-btn-lg" type="button" onClick={() => setIsBookingOpen(false)}>{copy.done}</button>
              </div>
            ) : (
              <>
                <p className="v4-kicker">{copy.schedule}</p>
                <h2 className="v4-h2" id="booking-title">{copy.yourTime}<br />{copy.yourTimeAccent}</h2>
                <p className="v4-sub">{copy.chooseTime}</p>
                <form className="v4-form" onSubmit={requestBooking}>
                  <label>{copy.yourEmail}<input required type="email" name="email" placeholder={copy.emailPlaceholder} autoComplete="email" /></label>
                  <div className="v4-two">
                    <label>{copy.day}<select name="day" defaultValue="Tuesday, Sep 1"><option>Tuesday, Sep 1</option><option>Wednesday, Sep 2</option><option>Thursday, Sep 3</option></select></label>
                    <label>{copy.time}<select name="time" defaultValue="10:00 AM"><option>10:00 AM</option><option>1:30 PM</option><option>3:00 PM</option></select></label>
                  </div>
                  <button className="v4-btn v4-btn-primary v4-btn-lg v4-full" type="submit">{copy.request}</button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default AppV4
