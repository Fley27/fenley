import { useEffect, useState } from 'react'
import marketCheckout from '../assets/market-checkout.jpg'
import getTranslation from '../utils/translation.ts'
import './AppV2.css'

const translations = {
  en: getTranslation.en,
  fr: getTranslation.fr,
  ht: getTranslation.ht
}

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.v2-root .reveal')
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

function AppV2() {
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
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
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
    <div className="v2-root">
      <div className="v2-nav-wrap">
        <nav className={`v2-nav ${isScrolled ? 'v2-nav-solid' : ''}`}>
          <a className="v2-brand" href="#top" aria-label="Fenley Menelas home">
            <span className="v2-wordmark"><strong>Fenley</strong><b>MENELAS</b><i aria-hidden="true" /></span>
          </a>
          <div className="v2-nav-links">
            <a href="#services">{copy.services}</a>
            <a href="#work">{copy.showcaseEyebrow}</a>
            <a href="#approach">{copy.approach}</a>
            <a href="#contact">{copy.contact}</a>
          </div>
          <div className="v2-nav-actions">
            <div className="v2-lang" aria-label="Language selector">
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">EN</button>
              <button className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')} type="button">FR</button>
              <button className={language === 'ht' ? 'active' : ''} onClick={() => setLanguage('ht')} type="button">KRE</button>
            </div>
            <button className="v2-btn v2-btn-primary v2-btn-sm" type="button" onClick={openBooking}>{copy.book} <span>↗</span></button>
          </div>
        </nav>
      </div>

      <section className="v2-hero" id="top">
        <div className="v2-hero-bg" aria-hidden="true">
          <div className="v2-grid" />
          <div className="v2-orb v2-orb-blue" />
          <div className="v2-orb v2-orb-lime" />
        </div>
        <div className="v2-shell v2-hero-grid">
          <div className="v2-hero-copy">
            <div className="v2-pill"><i /> {copy.eyebrow}</div>
            <h1>{copy.heroTitle}<br /><em>{copy.heroAccent}</em></h1>
            <p className="v2-lead">{copy.heroText}</p>
            {builds.length > 0 && (
              <div className="v2-builds" aria-label="What I build">
                {builds.map((b) => <span key={b}>{b}</span>)}
              </div>
            )}
            <div className="v2-hero-actions">
              <a className="v2-btn v2-btn-dark" href="#contact">{copy.start} <span>↗</span></a>
              <button className="v2-btn v2-btn-red" type="button" onClick={openBooking}>{copy.book} <span>↗</span></button>
            </div>
            <div className="v2-hero-note"><span className="v2-avatar">FM</span><span>{copy.based}<br /><b>{copy.happy}</b></span></div>
            <div className="v2-hero-stats">
              <div><strong>10</strong><span>{copy.years}</span></div>
              <div className="v2-stat-div" aria-hidden="true" />
              <div><strong>{copy.prefixTypes}</strong><span>{copy.types}</span></div>
            </div>
            <div className="v2-trust-row">
              <span><i>✓</i> {copy.trustedRow}</span>
              <span><i>✓</i> {copy.replies}</span>
              <span><i>✓</i> {copy.languages}</span>
            </div>
          </div>
          <div className="v2-hero-visual">
            <div className="v2-image-frame">
              <img src={marketCheckout} alt="Two women using mobile commerce at a local market" fetchPriority="high" decoding="async" />
              <div className="v2-image-glow" aria-hidden="true" />
            </div>
            <div className="v2-wow-card">
              <span className="v2-stars">★★★★★</span>
              <strong>{copy.wowCardTitle}</strong>
              <span className="v2-wow-sub">{copy.wowCardText}</span>
            </div>
            <div className="v2-own-card">
              <span className="v2-check">✓</span>
              <div><strong>{copy.ownCardTitle}</strong><span>{copy.ownCardText}</span></div>
            </div>
            <div className="v2-dash">
              <div className="v2-dash-top"><span>{copy.stock}</span><span className="v2-live"><i /> {copy.live}</span></div>
              <div className="v2-stock-row"><div><small>{copy.items}</small><strong>1,284</strong></div><span className="v2-trend">↑ 12.8%</span></div>
              <div className="v2-bars"><i style={{height:'42%'}} /><i style={{height:'60%'}} /><i style={{height:'50%'}} /><i style={{height:'78%'}} /><i style={{height:'67%'}} /><i style={{height:'92%'}} /><i style={{height:'84%'}} /><i style={{height:'100%'}} /></div>
              <div className="v2-dash-labels">{copy.days.map((day) => <span key={day}>{day}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-signal reveal">
        <div className="v2-shell">
          <div className="v2-signal-card">
            <p><span>01</span> {copy.local}</p>
            <p><span>02</span> {copy.offline}</p>
            <p><span>03</span> {copy.grow}</p>
          </div>
        </div>
      </section>

      <section className="v2-services v2-shell reveal" id="services">
        <div className="v2-section-intro">
          <div className="v2-pill"><i /> {copy.what}</div>
          <h2>{copy.messy}<br /><em>{copy.momentum}</em></h2>
        </div>
        <div className="v2-service-list">
          <article className="v2-service">
            <span className="v2-service-no">01</span>
            <div><h3>{copy.inventory}</h3><p>{copy.inventoryText}</p></div>
            <span className="v2-arrow">↗</span>
          </article>
          <article className="v2-service">
            <span className="v2-service-no">02</span>
            <div><h3>{copy.digital}</h3><p>{copy.digitalText}</p></div>
            <span className="v2-arrow">↗</span>
          </article>
          <article className="v2-service">
            <span className="v2-service-no">03</span>
            <div><h3>{copy.custom}</h3><p>{copy.customText}</p></div>
            <span className="v2-arrow">↗</span>
          </article>
        </div>
      </section>

      <section className="v2-shell reveal" id="work">
        <div className="v2-showcase-head">
          <div className="v2-pill"><i /> {copy.showcaseEyebrow}</div>
          <h2>{copy.showcaseTitle}<br /><em>{copy.showcaseAccent}</em></h2>
          <p>{copy.showcaseText}</p>
        </div>
        <div className="v2-showcase-grid">
          <article className="v2-show-card">
            <div className="v2-mock v2-mock-browser" aria-hidden="true">
              <div className="v2-mock-bar"><i /><i /><i /><span /></div>
              <div className="v2-mock-body">
                <div className="v2-mock-hero" />
                <div className="v2-mock-lines"><i /><i /><i /></div>
                <div className="v2-mock-cta"><b /> <b className="ghost" /></div>
              </div>
              <div className="v2-mock-float">Web</div>
            </div>
            <h3>{copy.webTitle}</h3>
            <p>{copy.webText}</p>
            <span className="v2-outcome">{copy.webOutcome}</span>
          </article>
          <article className="v2-show-card v2-show-dark">
            <div className="v2-mock v2-mock-phone" aria-hidden="true">
              <div className="v2-phone-notch" />
              <div className="v2-phone-screen">
                <div className="v2-phone-hero" />
                <div className="v2-mock-lines light"><i /><i /></div>
                <div className="v2-phone-btn" />
              </div>
              <div className="v2-mock-float">App</div>
            </div>
            <h3>{copy.appTitle}</h3>
            <p>{copy.appText}</p>
            <span className="v2-outcome v2-outcome-lime">{copy.appOutcome}</span>
          </article>
          <article className="v2-show-card">
            <div className="v2-mock v2-mock-dash" aria-hidden="true">
              <div className="v2-dash-side"><i /><i /><i /><i /></div>
              <div className="v2-dash-main">
                <div className="v2-dash-cards"><b /><b /><b /></div>
                <div className="v2-dash-chart"><i style={{height:'40%'}} /><i style={{height:'65%'}} /><i style={{height:'50%'}} /><i style={{height:'85%'}} /><i style={{height:'100%'}} /></div>
              </div>
              <div className="v2-mock-float">System</div>
            </div>
            <h3>{copy.sysTitle}</h3>
            <p>{copy.sysText}</p>
            <span className="v2-outcome">{copy.sysOutcome}</span>
          </article>
        </div>
      </section>

      <section className="v2-shell reveal">
        <div className="v2-trust-card">
          <div className="v2-pill v2-pill-lime"><i /> {copy.trustEyebrow}</div>
          <h2>{copy.trustTitle}<br /><em>{copy.trustAccent}</em></h2>
          <div className="v2-trust-grid">
            <div><span className="v2-tick">✓</span><strong>{copy.trust1t}</strong><p>{copy.trust1d}</p></div>
            <div><span className="v2-tick">✓</span><strong>{copy.trust2t}</strong><p>{copy.trust2d}</p></div>
            <div><span className="v2-tick">✓</span><strong>{copy.trust3t}</strong><p>{copy.trust3d}</p></div>
            <div><span className="v2-tick">✓</span><strong>{copy.trust4t}</strong><p>{copy.trust4d}</p></div>
          </div>
        </div>
      </section>

      <section className="v2-shell reveal">
        <div className="v2-card v2-card-dark">
          <div className="v2-card-glow" aria-hidden="true" />
          <div className="v2-visibility-icon" role="img" aria-label="Location signal">
            <i /><i /><i />
          </div>
          <div>
            <div className="v2-pill v2-pill-lime"><i /> {copy.find}</div>
            <h2>{copy.map}<br /><em>{copy.mapAccent}</em></h2>
            <p>{copy.mapText}</p>
          </div>
          <div className="v2-visibility-detail">
            <span>{copy.visibility}</span>
            <strong>{copy.moreWays}</strong>
          </div>
        </div>
      </section>

      <section className="v2-shell reveal">
        <div className="v2-card v2-card-light">
          <div className="v2-payment-mark" role="img" aria-label="Mobile contactless payment">
            <span className="v2-phone" />
            <i /><i /><i />
          </div>
          <div className="v2-moncash-copy">
            <div className="v2-pill"><i /> {copy.opportunity}</div>
            <h2>{copy.payment}<br /><em>{copy.paymentAccent}</em></h2>
            <p>{copy.paymentText}</p>
            <div className="v2-tags">
              <span>{copy.restaurants}</span>
              <span>{copy.retail}</span>
              <span>{copy.hotels}</span>
              <span>{copy.hospitals}</span>
              <span>{copy.service}</span>
              <span>{copy.more}</span>
            </div>
          </div>
          <div className="v2-moncash-side">
            <div><strong>01</strong><p>{copy.payFaster}</p></div>
            <div><strong>02</strong><p>{copy.reachFurther}</p></div>
          </div>
        </div>
      </section>

      <section className="v2-approach reveal" id="approach">
        <div className="v2-approach-bg" aria-hidden="true" />
        <div className="v2-shell v2-approach-grid">
          <div>
            <div className="v2-pill v2-pill-lime"><i /> {copy.way}</div>
            <h2>{copy.technology}<br /><em>{copy.meet}</em></h2>
          </div>
          <div className="v2-approach-copy">
            <p>{copy.approachText1}</p>
            <p>{copy.approachText2}</p>
            <a className="v2-btn v2-btn-lime" href="#contact">{copy.build} <span>↗</span></a>
          </div>
        </div>
        <div className="v2-shell v2-process">
          <div><span>01</span><strong>{copy.process1t}</strong><p>{copy.process1d}</p></div>
          <div><span>02</span><strong>{copy.process2t}</strong><p>{copy.process2d}</p></div>
          <div><span>03</span><strong>{copy.process3t}</strong><p>{copy.process3d}</p></div>
        </div>
      </section>

      <section className="v2-contact v2-shell reveal" id="contact">
        <div className="v2-contact-line">
          <div className="v2-pill"><i /> {copy.problem}</div>
          <h2>{copy.clear}<br /><em>{copy.clearAccent}</em></h2>
          <p className="v2-contact-blurb">{copy.contactText}</p>
          <form className="v2-form" onSubmit={sendContact}>
            {contactSent ? (
              <div className="v2-form-success"><strong>{copy.draft}</strong><span>{copy.draftText}</span></div>
            ) : (
              <>
                <label>{copy.name}<input required name="name" placeholder={copy.yourName} /></label>
                <label>{copy.email}<input required type="email" name="email" placeholder={copy.emailPlaceholder} /></label>
                <label>{copy.message}<textarea required name="message" rows="3" placeholder={copy.messagePlaceholder}></textarea></label>
                <button className="v2-btn v2-btn-dark" type="submit">{copy.send} <span>↗</span></button>
              </>
            )}
          </form>
        </div>
        <div className="v2-contact-aside">
          <div className="v2-booking-panel">
            <span className="v2-booking-kicker">{copy.prefer}</span>
            <h3>{copy.findTime}</h3>
            <p>{copy.bookingText}</p>
            <button className="v2-btn v2-btn-lime" type="button" onClick={openBooking}>{copy.available} <span>↗</span></button>
          </div>
          <div className="v2-contact-phone">
            <span>{copy.call}</span>
            <div className="v2-contact-links">
              <a href="tel:+50931664446">+509 3166-4446 <span>↗</span></a>
              <a href="https://wa.me/50931664446" target="_blank" rel="noreferrer">{copy.whatsapp} <span>↗</span></a>
            </div>
          </div>
          <a className="v2-trust-link" href="https://www.upwork.com/freelancers/~01cf968566f1af7018" target="_blank" rel="noreferrer">{copy.upwork} <span>↗</span></a>
        </div>
      </section>

      <footer className="v2-footer v2-shell"><span>© 2026 Fenley Menelas</span><span>{copy.footerTagline}</span><span>{copy.footerLocation}</span></footer>

      {isBookingOpen && (
        <div className="v2-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsBookingOpen(false) }}>
          <section className="v2-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
            <button className="v2-modal-close" type="button" aria-label="Close booking dialog" onClick={() => setIsBookingOpen(false)}>×</button>
            {bookingSent ? (
              <div className="v2-modal-success">
                <span className="v2-success-mark">✓</span>
                <h2>{copy.draft}</h2>
                <p>{copy.draftText}</p>
                <button className="v2-btn v2-btn-dark" type="button" onClick={() => setIsBookingOpen(false)}>{copy.done} <span>↗</span></button>
              </div>
            ) : (
              <>
                <div className="v2-pill"><i /> {copy.schedule}</div>
                <h2 id="booking-title">{copy.yourTime}<br /><em>{copy.yourTimeAccent}</em></h2>
                <p className="v2-modal-copy">{copy.chooseTime}</p>
                <form className="v2-form" onSubmit={requestBooking}>
                  <label>{copy.yourEmail}<input required type="email" name="email" placeholder={copy.emailPlaceholder} /></label>
                  <div className="v2-booking-options">
                    <label>{copy.day}<select name="day" defaultValue="Tuesday, Sep 1"><option>Tuesday, Sep 1</option><option>Wednesday, Sep 2</option><option>Thursday, Sep 3</option></select></label>
                    <label>{copy.time}<select name="time" defaultValue="10:00 AM"><option>10:00 AM</option><option>1:30 PM</option><option>3:00 PM</option></select></label>
                  </div>
                  <button className="v2-btn v2-btn-dark" type="submit">{copy.request} <span>↗</span></button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

export default AppV2
