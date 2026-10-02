import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
const OUT = '/tmp/shots2'
const routes = [
  ['/', 'home'],
  ['/services', 'services'],
  ['/build', 'build'],
  ['/work', 'work'],
  ['/about', 'about'],
  ['/contact', 'contact'],
]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

async function capture(context, name, route) {
  const page = await context.newPage()
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.evaluate((label) => {
    const el = document.createElement('div')
    el.textContent = label
    el.style.cssText =
      'position:fixed;left:8px;bottom:8px;z-index:99999;font:11px monospace;color:#6ee7f9;background:rgba(0,0,0,.72);padding:3px 8px;border-radius:5px;pointer-events:none'
    document.body.appendChild(el)
  }, `${name} #${Math.random().toString(36).slice(2, 8)}`)
  await page.evaluate(async () => {
    const height = document.body.scrollHeight
    for (let y = 0; y < height; y += 400) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 110))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForTimeout(1200)
  const h1 = await page.locator('h1').first().innerText()
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true })
  console.log(name, '->', h1.replace(/\n/g, ' | '))
  await page.close()
}

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
for (const [route, name] of routes) await capture(desktop, `desk-${name}`, route)

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})
await capture(mobile, 'mobile-home', '/')
await capture(mobile, 'mobile-services', '/services')
await capture(mobile, 'mobile-contact', '/contact')

await browser.close()
console.log('done')
