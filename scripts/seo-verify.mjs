import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:3111'
const OUT = process.env.OUT || '/tmp/seo-qa'
const ROUTES = ['/', '/services', '/build', '/skills', '/about', '/contact']
const LOCALES = ['en', 'es', 'fr']

let fail = 0
const check = (ok, label, extra = '') => {
  if (!ok) fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${extra ? ' — ' + extra : ''}`)
}
const expectPath = (route, locale) => (locale === 'en' ? route : route === '/' ? `/${locale}` : `/${locale}${route}`)

// Headless WebGL shader compilation can take several seconds; wait until React
// has actually hydrated the nav before trying to click anything.
async function settle(page) {
  await page.waitForFunction(
    () => {
      const a = document.querySelector('.nav-links a')
      return Boolean(a && Object.keys(a).some((k) => k.startsWith('__reactProps')))
    },
    null,
    { timeout: 60000 }
  )
  await page.waitForTimeout(300)
}

async function httpChecks() {
  for (const locale of LOCALES) {
    for (const route of ROUTES) {
      const path = expectPath(route, locale)
      const res = await fetch(BASE + path)
      const html = await res.text()
      const pick = (re) => (html.match(re) || [])[1]
      const hreflangs = [...html.matchAll(/<link rel="alternate" href[Ll]ang="([^"]*)"/g)].map((m) => m[1])
      const title = pick(/<title>([^<]*)<\/title>/)
      const desc = pick(/<meta name="description" content="([^"]*)"/)
      const ldCount = (html.match(/<script type="application\/ld\+json">/g) || []).length
      const ogImage = pick(/property="og:image" content="([^"]*)"/)
      const expectedOg = locale === 'en' ? '/og.png' : `/og.${locale}.png`

      check(res.status === 200, `${path} status 200`, String(res.status))
      check(pick(/<html lang="([^"]*)"/) === locale, `${path} <html lang>`, pick(/<html lang="([^"]*)"/))
      check(Boolean(title && desc), `${path} title + description`, title)
      check(!/name="robots" content="noindex/.test(html), `${path} indexable`)
      check(Boolean(pick(/<link rel="canonical" href="([^"]*)"/)), `${path} canonical`)
      check(hreflangs.length === 4 && ['en', 'es', 'fr', 'x-default'].every((l) => hreflangs.includes(l)), `${path} hreflang set`)
      check(Boolean(ogImage) && ogImage.endsWith(expectedOg), `${path} og:image`, ogImage)
      check(ldCount >= 1, `${path} JSON-LD`, `${ldCount} block(s)`)
      check(html.includes("document.documentElement.classList.add('js')"), `${path} reveal gate script`)
      check(html.includes('.woff2') && !/fonts\.(googleapis|gstatic)/.test(html), `${path} self-hosted fonts`)
    }
  }

  const enRedirect = await fetch(BASE + '/en', { redirect: 'manual' })
  check(enRedirect.status === 307 && new URL(enRedirect.headers.get('location'), BASE).pathname === '/',
    'en /en redirects to /', `status ${enRedirect.status} → ${enRedirect.headers.get('location')}`)

  for (const path of ['/nope', '/de', '/es/nope', '/services/x', '/xyz/abc', '/es/services/deep']) {
    const res = await fetch(BASE + path)
    const html = await res.text()
    check(res.status === 404, `404 ${path}`, String(res.status))
    check(html.includes('Page not found') && /<link rel="stylesheet"/.test(html), `404 ${path} styled`)
  }

  for (const path of [
    '/llms.txt',
    '/robots.txt',
    '/sitemap.xml',
    '/og.png',
    '/og.es.png',
    '/og.fr.png',
    '/apple-touch-icon.png',
    '/portrait.jpg',
    '/portrait-cutout.webp',
  ]) {
    const res = await fetch(BASE + path)
    check(res.status === 200, `asset ${path}`, `${res.status} ${res.headers.get('content-type')}`)
  }

  const robots = await (await fetch(BASE + '/robots.txt')).text()
  check(
    ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended'].every(
      (bot) => robots.includes(bot)
    ),
    'robots.txt allows AI crawlers'
  )
  check(robots.includes('Sitemap: https://fenleymenelas.com/sitemap.xml'), 'robots.txt sitemap')

  const llms = await (await fetch(BASE + '/llms.txt')).text()
  check(llms.startsWith('# Fenley Menelas') && llms.includes('$1,000'), 'llms.txt content')

  const sitemap = await (await fetch(BASE + '/sitemap.xml')).text()
  const locs = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
  check(locs.length === 18, 'sitemap URL count', String(locs.length))
  check(sitemap.includes('hreflang="x-default"') && sitemap.includes('hreflang="es"'), 'sitemap hreflang')

  for (const path of ['/services', '/es/services', '/fr/services']) {
    const html = await (await fetch(BASE + path)).text()
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((m) =>
      JSON.parse(m[1])
    )
    const types = blocks.flatMap((b) => (b['@graph'] || [b]).map((n) => n['@type']))
    check(blocks.length === 2, `${path} site + service JSON-LD`, String(blocks.length))
    check(['FAQPage', 'ProfessionalService', 'Offer'].every((t) => types.includes(t)), `${path} rich types`)
    const faqs = [...html.matchAll(/<div class="faq-a"([^>]*)>/g)]
    check(faqs.length === 8 && !faqs.some(([, attrs]) => /(^|\s)hidden(\s|=|$)/.test(attrs)), `${path} FAQ answers in HTML`)
  }
}

async function browserChecks() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.setDefaultTimeout(60000)

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await settle(page)
  check((await page.locator('h1').first().innerText()).includes('Built for your audience'), 'home headline')
  check((await page.evaluate(() => document.documentElement.lang)) === 'en', 'home html lang')
  check(await page.evaluate(() => document.documentElement.classList.contains('js')), 'html.js set')
  check(
    /Space Grotesk/i.test(await page.evaluate(() => getComputedStyle(document.querySelector('h1')).fontFamily)),
    'display font applied'
  )
  await page.screenshot({ path: `${OUT}/home.png` })

  const revealTotal = await page.evaluate(() => document.querySelectorAll('.reveal').length)
  await page.evaluate(async () => {
    const h = document.body.scrollHeight
    for (let y = 0; y < h; y += 300) {
      window.scrollTo({ top: y })
      await new Promise((r) => setTimeout(r, 60))
    }
  })
  await page.waitForTimeout(1500)
  const revealed = await page.evaluate(() => document.querySelectorAll('.reveal.is-visible').length)
  check(revealed > 0 && revealTotal > 0, 'scroll reveals fire', `${revealed}/${revealTotal}`)

  const esLink = page.locator('.nav-actions .lang-switch a', { hasText: 'ES' })
  check((await esLink.getAttribute('href')) === '/es', 'language switch href', await esLink.getAttribute('href'))
  await esLink.click()
  await page.waitForURL('**/es')
  await settle(page)
  check((await page.evaluate(() => document.documentElement.lang)) === 'es', 'html lang after switch')
  check((await page.locator('h1').first().innerText()).includes('Creado para tu audiencia'), 'Spanish home copy')
  const servicesLink = page.locator('.nav-links a', { hasText: 'Servicios' })
  check((await servicesLink.getAttribute('href')) === '/es/services', 'localised nav href')
  await servicesLink.click()
  await page.waitForURL('**/es/services')
  await settle(page)

  await page.waitForTimeout(600)
  const faq = page.locator('.faq-item').first()
  const faqBtn = faq.locator('button').first()
  const openHeight = await faq.locator('.faq-a').evaluate((e) => e.getBoundingClientRect().height)
  check(openHeight > 30, 'FAQ starts open (index 0)', String(openHeight))
  check((await faqBtn.getAttribute('aria-expanded')) === 'true', 'FAQ aria-expanded when open')
  await faqBtn.click()
  await page.waitForTimeout(700)
  const closedHeight = await faq.locator('.faq-a').evaluate((e) => e.getBoundingClientRect().height)
  check(closedHeight < 5, 'FAQ collapses on click', String(closedHeight))
  check((await faqBtn.getAttribute('aria-expanded')) === 'false', 'FAQ aria-expanded when closed')
  await faqBtn.click()
  await page.waitForTimeout(700)
  const reopened = await faq.locator('.faq-a').evaluate((e) => e.getBoundingClientRect().height)
  check(reopened > 30, 'FAQ reopens on second click', String(reopened))
  check(await faq.locator('.faq-a p').isVisible(), 'FAQ answer visible')
  await page.screenshot({ path: `${OUT}/faq-open.png` })

  await page.goto(`${BASE}/does-not-exist`, { waitUntil: 'networkidle' })
  check(await page.locator('h1').first().isVisible(), '404 renders')
  check(
    (await page.evaluate(() => getComputedStyle(document.body).backgroundColor)) === 'rgb(5, 6, 10)',
    '404 uses site theme'
  )
  await page.screenshot({ path: `${OUT}/404.png` })

  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' })
  await settle(page)
  await page
    .waitForFunction(
      () => {
        const img = document.querySelector('.portrait-img')
        return Boolean(img && img.complete)
      },
      null,
      { timeout: 20000 }
    )
    .catch(() => {})
  check(
    await page
      .locator('.portrait-img')
      .evaluate((img) => img.complete && img.naturalWidth > 0)
      .catch(() => false),
    'portrait loads'
  )

  await browser.close()
}

await httpChecks()
await browserChecks()
console.log(fail ? `\n${fail} FAILURES` : '\nALL PASS')
process.exit(fail ? 1 : 0)
