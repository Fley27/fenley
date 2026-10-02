import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'
import { content } from './src/site/content.js'

const OUT = new URL('./public/', import.meta.url).pathname
const SITE_URL = 'https://fenleymenelas.com'

const MONOGRAM_PATHS = `<g transform="translate(22 22) scale(0.9) translate(-22 -22)" fill="url(#g)">
  <path d="M6.35 34.72L2.5 34.72L2.5 9.28L18.82 9.28L18.82 12.88L6.35 12.88L6.35 20.66L16.82 20.66L16.82 24.04L6.35 24.04L6.35 34.72"/>
  <path d="M26.49 34.72L22.82 34.72L22.82 9.28L26.89 9.28L32.16 20.76L37.43 9.28L41.5 9.28L41.5 34.72L37.83 34.72L37.83 16.62L33.69 25.71L30.63 25.71L26.49 16.66L26.49 34.72"/>
</g>`

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function ogDocument(lang) {
  const home = content[lang].home
  const meta = content[lang].meta.home
  const langChip = { en: 'EN · English', es: 'ES · Español', fr: 'FR · Français' }[lang]

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    background: #05060a;
    color: #eef0f6;
    font-family: 'Manrope', sans-serif;
    padding: 64px 72px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.5;
    pointer-events: none;
  }
  .glow-a { width: 520px; height: 520px; right: -120px; top: -180px; background: #6ee7f9; opacity: 0.34; }
  .glow-b { width: 560px; height: 560px; left: -160px; bottom: -260px; background: #8b7cff; opacity: 0.36; }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(circle at 30% 45%, #000 0%, transparent 78%);
    -webkit-mask-image: radial-gradient(circle at 30% 45%, #000 0%, transparent 78%);
  }
  .row { position: relative; display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 18px; }
  .mark { width: 76px; height: 76px; border-radius: 18px; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.14); display: grid; place-items: center; }
  .brand-name { font-family: 'DM Mono', monospace; font-size: 26px; letter-spacing: 0.04em; color: #dfe3ee; }
  .chip {
    font-family: 'DM Mono', monospace; font-size: 22px; letter-spacing: 0.16em;
    padding: 14px 26px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.05); color: #aab2c6;
  }
  .middle { position: relative; max-width: 940px; }
  .eyebrow {
    font-family: 'DM Mono', monospace; font-size: 20px; letter-spacing: 0.28em;
    text-transform: uppercase;
    background: linear-gradient(115deg, #6ee7f9 0%, #8b7cff 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  h1 {
    margin-top: 22px;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600; font-size: 76px; line-height: 1.03; letter-spacing: -0.035em;
    text-wrap: balance;
  }
  .lead { margin-top: 26px; max-width: 860px; font-size: 27px; line-height: 1.55; color: #9aa2b4; }
  .tone {
    background: linear-gradient(105deg, #b9c1d4 0%, #878fa6 55%, #666e86 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .url {
    position: relative;
    font-family: 'DM Mono', monospace; font-size: 24px; letter-spacing: 0.06em; color: #dfe3ee;
    display: flex; align-items: center; gap: 14px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #6ee7f9; box-shadow: 0 0 16px #6ee7f9; }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>

  <div class="row">
    <div class="brand">
      <div class="mark">
        <svg width="52" height="52" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="g" x1="9" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
            <stop stop-color="#6EE7F9"/><stop offset="1" stop-color="#8B7CFF"/>
          </linearGradient></defs>
          ${MONOGRAM_PATHS}
        </svg>
      </div>
      <span class="brand-name">Fenley Menelas</span>
    </div>
    <span class="chip">${escapeHtml(langChip)}</span>
  </div>

  <div class="middle">
    <div class="eyebrow">${escapeHtml(home.hero.eyebrow)}</div>
    <h1>${escapeHtml(home.hero.title1)}<br /><span class="tone">${escapeHtml(home.hero.title2)}</span></h1>
    <p class="lead">${escapeHtml(meta.desc)}</p>
  </div>

  <div class="url"><span class="dot"></span>fenleymenelas.com</div>
</body>
</html>`
}

function touchIconDocument() {
  return `<!doctype html><html><head><meta charset="utf-8" /><style>
  * { margin: 0; padding: 0; }
  html, body { width: 180px; height: 180px; overflow: hidden; }
  </style></head><body>
  <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="180" fill="#05060a"/>
    <defs><linearGradient id="g" x1="40" y1="34" x2="140" y2="146" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6EE7F9"/><stop offset="1" stop-color="#8B7CFF"/>
    </linearGradient></defs>
    <g transform="translate(90 90) scale(2.7) translate(-22 -22)" fill="url(#g)">
      <path d="M6.35 34.72L2.5 34.72L2.5 9.28L18.82 9.28L18.82 12.88L6.35 12.88L6.35 20.66L16.82 20.66L16.82 24.04L6.35 24.04L6.35 34.72"/>
      <path d="M26.49 34.72L22.82 34.72L22.82 9.28L26.89 9.28L32.16 20.76L37.43 9.28L41.5 9.28L41.5 34.72L37.83 34.72L37.83 16.62L33.69 25.71L30.63 25.71L26.49 16.66L26.49 34.72"/>
    </g>
  </svg>
  </body></html>`
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })

mkdirSync(OUT, { recursive: true })

for (const lang of ['en', 'es', 'fr']) {
  await page.setViewportSize({ width: 1200, height: 630 })
  await page.setContent(ogDocument(lang), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const file = lang === 'en' ? 'og.png' : `og.${lang}.png`
  await page.screenshot({ path: `${OUT}${file}` })
  console.log('wrote', file)
}

await page.setViewportSize({ width: 180, height: 180 })
await page.setContent(touchIconDocument(), { waitUntil: 'load' })
await page.screenshot({ path: `${OUT}apple-touch-icon.png` })
console.log('wrote apple-touch-icon.png')

await browser.close()
console.log('done — site url', SITE_URL)
