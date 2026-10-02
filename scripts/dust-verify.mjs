import { chromium } from 'playwright'
import fs from 'node:fs'

const BASE = 'http://localhost:3000'
const OUT = '/tmp/dust-verify'
fs.mkdirSync(OUT, { recursive: true })

const results = []
const log = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
}

const browser = await chromium.launch()

// The river renders on a WebGL canvas; pixels are read back via the
// dev-only window.__dustRead() hook (redraw + readPixels in one task).
const read = (page) =>
  page.evaluate(() => {
    if (typeof window.__dustRead !== 'function') return null
    return window.__dustRead()
  })

// --- 1. desktop: painted, motion, scroll coupling, DOM pinning ---
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const first = await read(page)
  log('hook (dev __dustRead available)', first !== null)
  log(
    'river painted (enough lit pixels)',
    first && first.painted > 5000 && first.alpha > 100000,
    first ? `painted=${first.painted} alpha=${first.alpha}` : 'no read'
  )

  await page.waitForTimeout(1500)
  const second = await read(page)
  log(
    'motion (river flows over 1.5s)',
    second && first && second.hash !== first.hash,
    second && first ? `hash ${first.hash} -> ${second.hash}` : 'no read'
  )

  // scroll couples into the river (bend + clear zones change)
  await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }))
  await page.waitForTimeout(600)
  const scrolled = await read(page)
  log(
    'scroll coupling (river bends with scroll)',
    scrolled && second && scrolled.hash !== second.hash,
    scrolled && second ? `hash ${second.hash} -> ${scrolled.hash}` : 'no read'
  )

  const before = await page.evaluate(() => {
    const r = document.querySelector('.dust-canvas').getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height }
  })
  const after = await page.evaluate(() => {
    const el = document.querySelector('.dust-canvas')
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return { x: r.x, y: r.y, w: r.width, h: r.height, pos: cs.position }
  })
  log(
    'pinned (stays at viewport after 2200px scroll)',
    after.pos === 'fixed' &&
      Math.abs(after.x - before.x) < 1 &&
      Math.abs(after.y - before.y) < 1 &&
      after.h === 900,
    `pos=${after.pos} x=${after.x} y=${after.y} h=${after.h}`
  )

  const stacking = await page.evaluate(() => {
    const c = document.querySelector('.dust-canvas')
    const main = document.querySelector('#main')
    return {
      canvasZ: getComputedStyle(c).zIndex,
      mainZ: getComputedStyle(main).zIndex,
      mainPos: getComputedStyle(main).position,
    }
  })
  log(
    'stacking (main above canvas)',
    stacking.mainPos === 'relative' && Number(stacking.mainZ) > Number(stacking.canvasZ),
    JSON.stringify(stacking)
  )

  await page.screenshot({ path: `${OUT}/mid-scroll.png` })
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(900)
  await page.screenshot({ path: `${OUT}/hero-top.png` })
  await page.close()
}

// --- 2. reduced motion: static frame, still painted ---
{
  const ctx = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1440, height: 900 },
  })
  const page = await ctx.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const a = await read(page)
  await page.waitForTimeout(1200)
  const b = await read(page)
  log(
    'reduced-motion (static frame)',
    a && b && a.hash === b.hash && a.painted === b.painted,
    a && b ? `hash=${a.hash} painted=${a.painted}` : 'no read'
  )
  log('reduced-motion (river still painted)', a && a.painted > 5000, a ? `painted=${a.painted}` : 'no read')
  await page.screenshot({ path: `${OUT}/reduced-motion.png` })
  await ctx.close()
}

// --- 3. mobile screenshot ---
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/mobile-hero.png` })
  const painted = await read(page)
  log('mobile (river painted)', painted && painted.painted > 2000, painted ? `painted=${painted.painted}` : 'no read')
  await page.close()
}

await browser.close()
const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} passed`)
process.exit(failed.length ? 1 : 0)
