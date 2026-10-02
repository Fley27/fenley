import { useEffect, useState } from 'react'
import marketCheckout from './assets/market-checkout.jpg'
import getTranslation from './utils/translation.ts'
import './App.css'

const translations = {
  en: getTranslation.en,
  fr: getTranslation.fr,
  ht: getTranslation.ht
}



function App() {
  const contactEmail = 'hi@fenleymenelas.com'
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [bookingSent, setBookingSent] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('fenley-language') || 'en')
  const copy = translations[language]

  useEffect(() => {
    localStorage.setItem('fenley-language', language)
    document.documentElement.lang = language === 'ht' ? 'ht' : language
  }, [language])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 250)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <main>
      <nav className={`nav shell ${isScrolled ? 'nav-scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Fenley Menelas home"><span className="wordmark"><strong>Fenley</strong><b>MENELAS</b><i aria-hidden="true" /></span></a>
        <div className="nav-links"><a href="#services">{copy.services}</a><a href="#approach">{copy.approach}</a><a href="#contact">{copy.contact}</a></div>
        <div className="nav-actions"><div className="language-switch" aria-label="Language selector"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">EN</button><button className={language === 'fr' ? 'active' : ''} onClick={() => setLanguage('fr')} type="button">FR</button><button className={language === 'ht' ? 'active' : ''} onClick={() => setLanguage('ht')} type="button">KRE</button></div><button className="nav-cta nav-button" type="button" onClick={openBooking}>{copy.book} <span>↗</span></button></div>
      </nav>
      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><i /> {copy.eyebrow}</div>
          <h1>{copy.heroTitle}<br /><em>{copy.heroAccent}</em></h1>
          <p className="hero-text">{copy.heroText}</p>
          <div className="hero-actions"><a className="button button-dark" href="#contact">{copy.start} <span>↗</span></a><button className="button button-blue booking-button" type="button" onClick={openBooking}>{copy.book} <span>↗</span></button></div>
          <div className="hero-note"><span className="avatar">FM</span><span>{copy.based}<br /><b>{copy.happy}</b></span></div>
          <div className="hero-stats"><div><strong>10</strong><span>{copy.years}</span></div><div><strong>{copy.prefixTypes}</strong><span>{copy.types}</span></div></div>
        </div>
        <div className="hero-visual">
          <div className="image-frame"><img src={marketCheckout} alt="Two women using mobile commerce at a local market" fetchPriority="high" decoding="async" /></div>
          <div className="dashboard-card">
            <div className="dash-top"><span>{copy.stock}</span><span className="live"><i /> {copy.live}</span></div>
            <div className="stock-row"><div><small>{copy.items}</small><strong>1,284</strong></div><span className="trend">↑ 12.8%</span></div>
            <div className="bars"><i style={{height:'42%'}} /><i style={{height:'60%'}} /><i style={{height:'50%'}} /><i style={{height:'78%'}} /><i style={{height:'67%'}} /><i style={{height:'92%'}} /><i style={{height:'84%'}} /><i style={{height:'100%'}} /></div>
            <div className="dash-labels">{copy.days.map((day) => <span key={day}>{day}</span>)}</div>
          </div>
          <div className="visual-tag"><span>01</span> Designed around<br />your reality</div>
        </div>
      </section>

      <section className="signal-band"><div className="shell signal-grid"><p><span>01</span> {copy.local}</p><p><span>02</span> {copy.offline}</p><p><span>03</span> {copy.grow}</p></div></section>
      <section className="services shell" id="services">
        <div className="section-intro"><div className="eyebrow"><i /> {copy.what}</div><h2>{copy.messy}<br /><em>{copy.momentum}</em></h2></div>
        <div className="service-list">
          <article className="service"><span className="service-no">01</span><div><h3>{copy.inventory}</h3><p>{copy.inventoryText}</p></div><span className="arrow">↗</span></article>
          <article className="service"><span className="service-no">02</span><div><h3>{copy.digital}</h3><p>{copy.digitalText}</p></div><span className="arrow">↗</span></article>
          <article className="service"><span className="service-no">03</span><div><h3>{copy.custom}</h3><p>{copy.customText}</p></div><span className="arrow">↗</span></article>
        </div>
      </section>
      <section className="visibility-band shell">
        <div className="visibility-icon" role="img" aria-label="Location signal">
          <i /><i /><i />
        </div>
        <div>
          <div className="eyebrow">
            <i /> {copy.find}
          </div>
          <h2>{copy.map}
            <br />
            <em>{copy.mapAccent}</em>
          </h2>
          <p>{copy.mapText}</p>
        </div>
        <div className="visibility-detail">
          <span>{copy.visibility}</span>
          <strong>{copy.moreWays}</strong>
          </div>
      </section>

      <section className="moncash shell">
        <div className="payment-mark" role="img" aria-label="Mobile contactless payment">
          <span className="phone-shape" />
          <i /><i /><i />
        </div>
        <div className="moncash-copy">
          <div className="eyebrow">
            <i /> {copy.opportunity}
          </div>
          <h2>
            {copy.payment}
            <br />
            <em>
              {copy.paymentAccent}
              </em>
          </h2>
          <p>
            {copy.paymentText}
            </p><div className="moncash-tags">
              <span>{copy.restaurants}</span>
              <span>{copy.retail}</span>
              <span>{copy.hotels}</span>
              <span>{copy.hospitals}</span>
              <span>{copy.service}</span><
                span>{copy.more}</span>
              </div>
              </div>
              <div className="moncash-side">
                <strong>01</strong><p>{copy.payFaster}</p>
                <strong>02</strong><p>{copy.reachFurther}</p>
              </div>
      </section>
      <section className="approach" id="approach"><div className="shell approach-grid"><div><div className="eyebrow light"><i /> {copy.way}</div><h2>{copy.technology}<br /><em>{copy.meet}</em></h2></div><div className="approach-copy"><p>{copy.approachText1}</p><p>{copy.approachText2}</p><a className="button button-light" href="#contact">{copy.build} <span>↗</span></a></div></div></section>
      <section className="contact shell" id="contact"><div className="contact-line"><div className="eyebrow"><i /> {copy.problem}</div><h2>{copy.clear}<br /><em>{copy.clearAccent}</em></h2><p className="contact-blurb">{copy.contactText}</p><form className="contact-form" onSubmit={sendContact}>{contactSent ? <div className="form-success"><strong>{copy.draft}</strong><span>{copy.draftText}</span></div> : <><label>{copy.name}<input required name="name" placeholder={copy.yourName} /></label><label>{copy.email}<input required type="email" name="email" placeholder={copy.emailPlaceholder} /></label><label>{copy.message}<textarea required name="message" rows="3" placeholder={copy.messagePlaceholder}></textarea></label><button className="button button-dark" type="submit">{copy.send} <span>↗</span></button></>}</form></div><div className="contact-aside"><div className="booking-panel"><span className="booking-kicker">{copy.prefer}</span><h3>{copy.findTime}</h3><p>{copy.bookingText}</p><button className="button button-light" type="button" onClick={openBooking}>{copy.available} <span>↗</span></button></div><div className="contact-phone"><span>{copy.call}</span><div className="contact-links"><a href="tel:+50931664446">+509 3166-4446 <span>↗</span></a><a href="https://wa.me/50931664446" target="_blank" rel="noreferrer">{copy.whatsapp} <span>↗</span></a></div></div><a className="text-link trust-link" href="https://www.upwork.com/freelancers/~01cf968566f1af7018" target="_blank" rel="noreferrer">{copy.upwork} <span>↗</span></a></div></section>
      <footer className="footer shell"><span>© 2026 Fenley Menelas</span><span>{copy.footerTagline}</span><span>{copy.footerLocation}</span></footer>
      {isBookingOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsBookingOpen(false) }}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" type="button" aria-label="Close booking dialog" onClick={() => setIsBookingOpen(false)}>×</button>{bookingSent ? <div className="modal-success"><span className="success-mark">✓</span><h2>{copy.draft}</h2><p>{copy.draftText}</p><button className="button button-dark" type="button" onClick={() => setIsBookingOpen(false)}>{copy.done} <span>↗</span></button></div> : <><div className="eyebrow"><i /> {copy.schedule}</div><h2 id="booking-title">{copy.yourTime}<br /><em>{copy.yourTimeAccent}</em></h2><p className="modal-copy">{copy.chooseTime}</p><form className="booking-form" onSubmit={requestBooking}><label>{copy.yourEmail}<input required type="email" name="email" placeholder={copy.emailPlaceholder} /></label><div className="booking-options"><label>{copy.day}<select name="day" defaultValue="Tuesday, Sep 1"><option>Tuesday, Sep 1</option><option>Wednesday, Sep 2</option><option>Thursday, Sep 3</option></select></label><label>{copy.time}<select name="time" defaultValue="10:00 AM"><option>10:00 AM</option><option>1:30 PM</option><option>3:00 PM</option></select></label></div><button className="button button-dark" type="submit">{copy.request} <span>↗</span></button></form></>}</section></div>}
    </main>
  )
}

export default App
