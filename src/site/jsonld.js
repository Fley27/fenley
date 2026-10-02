import { content } from './content.js'
import { SITE_NAME, SITE_URL, absoluteUrl } from './seo.js'

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

const SAME_AS = ['https://www.upwork.com/freelancers/~01cf968566f1af7018']

export function personSchema(lang) {
  const meta = content[lang] ? content[lang].meta.home : content.en.meta.home
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl('/portrait.jpg'),
    jobTitle: 'Web designer & developer',
    email: 'mailto:hi@fenleymenelas.com',
    telephone: '+50931664446',
    description: meta.desc,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HT',
      addressRegion: 'Haiti',
    },
    areaServed: ['US', 'CA', 'DO', 'HT', 'North America', 'Latin America'],
    knowsLanguage: ['en', 'es', 'fr'],
    knowsAbout: [
      'Web design',
      'Web development',
      'Next.js',
      'React',
      'WordPress',
      'Multilingual websites',
      'Technical SEO',
      'Web analytics',
    ],
    sameAs: SAME_AS,
  }
}

export function websiteSchema(lang) {
  const meta = content[lang] ? content[lang].meta.home : content.en.meta.home
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: lang,
    description: meta.desc,
    publisher: { '@id': PERSON_ID },
  }
}

export function organizationSchema(lang) {
  const meta = content[lang] ? content[lang].meta.home : content.en.meta.home
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/favicon.svg'),
    description: meta.desc,
    founder: { '@id': PERSON_ID },
    areaServed: ['US', 'CA', 'DO', 'HT'],
    sameAs: SAME_AS,
  }
}

export function servicesSchema(lang) {
  const svc = content[lang] ? content[lang].services : content.en.services
  if (!svc || !svc.list) return null
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/services#service`,
    name: `${SITE_NAME} — web design & development`,
    url: new URL('/services', SITE_URL).href,
    provider: { '@id': PERSON_ID },
    areaServed: ['US', 'CA', 'DO', 'HT'],
    priceRange: '$1,000+',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: svc.list.map((item, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: item.t,
          description: item.d,
        },
        position: index + 1,
      })),
    },
  }
}

export function pricingSchema(lang) {
  const svc = content[lang] ? content[lang].services : content.en.services
  if (!svc || !svc.pricing || !svc.pricing.cards) return null
  const parsePrice = (value) => {
    const n = Number(String(value).replace(/[^0-9.]/g, ''))
    return Number.isFinite(n) && n > 0 ? n : undefined
  }
  const cards = svc.pricing.cards
  const offers = []
  const build = cards[0]
  if (build) {
    const price = parsePrice(build.price)
    offers.push({
      '@type': 'Offer',
      name: build.name,
      price: price !== undefined ? String(price) : undefined,
      priceCurrency: price !== undefined ? 'USD' : undefined,
      description: build.note,
      category: 'Custom website build',
    })
  }
  const membership = cards[1]
  if (membership) {
    const price = parsePrice(membership.price)
    offers.push({
      '@type': 'Offer',
      name: membership.name,
      price: price !== undefined ? String(price) : undefined,
      priceCurrency: price !== undefined ? 'USD' : undefined,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: price !== undefined ? String(price) : undefined,
        priceCurrency: price !== undefined ? 'USD' : undefined,
        billingDuration: 'P1M',
      },
      description: membership.note,
      category: 'Website maintenance membership',
    })
  }
  if (!offers.length) return null
  return {
    '@type': 'Offer',
    '@id': `${SITE_URL}/services#pricing`,
    seller: { '@id': PERSON_ID },
    offers,
  }
}

export function faqSchema(lang) {
  const svc = content[lang] ? content[lang].services : content.en.services
  if (!svc || !svc.faq || !svc.faq.items || !svc.faq.items.length) return null
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/services#faq`,
    mainEntity: svc.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function contactPointSchema() {
  return {
    '@type': 'ContactPoint',
    contactType: 'Project enquiries',
    email: 'hi@fenleymenelas.com',
    telephone: '+50931664446',
    availableLanguage: ['en', 'es', 'fr'],
    areaServed: ['US', 'CA', 'DO', 'HT'],
  }
}

export function siteJsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [personSchema(lang), websiteSchema(lang), organizationSchema(lang), contactPointSchema()].filter(
      Boolean
    ),
  }
}

export function servicesJsonLd(lang) {
  const graph = [servicesSchema(lang), pricingSchema(lang), faqSchema(lang)].filter(Boolean)
  if (!graph.length) return null
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function pageJsonLd(lang, key) {
  const base = key === 'services' ? servicesJsonLd(lang) : null
  const graph = [personSchema(lang), websiteSchema(lang), organizationSchema(lang), contactPointSchema()]
  if (base) graph.push(...base['@graph'])
  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter(Boolean),
  }
}

export function jsonLdScript(data) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
